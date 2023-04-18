'use client';
import { useRef, useEffect, useState, memo } from 'react';
import styles from './EqulityTable.module.css';
import { equality, values } from '../../lib/jsEqulity';

const emitter = (() => {
  // Keep track of the currently highlighted row and column
  let currentRow = -1;
  let currentCol = -1;
  const subs = [];

  return {
    subscribe(r, c, cb) {
      subs[r] = subs[r] ?? [];
      subs[r][c] = cb;
      return () => delete subs[r][c];
    },

    highlight(newRow, newCol) {
      subs.forEach((row, r) => {
        row.forEach((cb, c) => {
          const wasHighlighted = r === currentRow || c === currentCol;
          const isHighlighted = r === newRow || c === newCol;
          // Only notify if the highlighting for this row
          // has changed. We could optimize this loop to
          // only run for the changed rows, but you're
          // unlikely to see noticable gains.
          if (wasHighlighted !== isHighlighted) {
            cb(isHighlighted);
          }
        });
      });

      // Update the currently highlighted cell, otherwise
      // you'll never unhighlight the old ones.
      currentRow = newRow;
      currentCol = newCol;
    },
  };
})();

export default function EqulityTable() {
  // const [mouseCord, setMouseCord] = useState({ x: -1, y: -1 });
  // const onMouseEnter = ([y, x]) => setMouseCord({ x: Number(x), y: Number(y) });
  // const onMouseLeave = () => setMouseCord({ x: null, y: null });
  // const getHoverStyle = ({ x, y }) => (x === mouseCord.x || y === mouseCord.y ? styles.labelHover : '');

  const getSign = ({ x, y }) => equality({ x, y }, ['=', '≅', '≠']);
  const getStyle = ({ x, y }) => equality({ x, y }, [styles.strict, styles.loose, styles.notEqual]);
  // const getTitle = ({ x, y }) => equality({ x, y }, ['Strict equality', 'Loose equality', 'Not equal']);

  const ColumnHeader = () => (
    <tr>
      <th></th>
      {values.map(({ label }, index) => (
        <th className={styles.labelCol} key={index}>
          {label}
        </th>
      ))}
    </tr>
  );

  const RowHeader = ({ label }) => <td className={styles.labelRow}>{label}</td>;

  const TableCell = ({ row, col, x, y }) => {
    const ref = useRef();

    useEffect(() => {
      emitter.subscribe(row, col, (isHighlighted) => {
        if (ref.current) {
          // Directly update the class on the DOM node
          ref.current.classList.toggle('global-highlight-cell', isHighlighted);
        }
      });
    }, [col, row]);

    return (
      <td key={col} className={getStyle({ x, y })} onMouseEnter={() => emitter.highlight(row, col)} ref={ref}>
        {getSign({ x, y })}
      </td>
    );
  };

  const Row = ({ x, row }) => values.map(({ y }, col) => <TableCell key={col} row={row} col={col} x={x} y={y} />);

  const Rows = () =>
    values.map(({ x, label }, row) => (
      <tr key={row}>
        <RowHeader label={label} />
        <Row x={x} row={row} />
      </tr>
    ));

  return (
    <table className={styles.table} onMouseLeave={() => emitter.highlight(-1, -1)}>
      <thead>
        <ColumnHeader />
      </thead>
      <tbody>
        <Rows />
      </tbody>
    </table>
  );
}
