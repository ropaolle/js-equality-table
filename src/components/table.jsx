import { useRef, useEffect } from 'react';
import './App.css';

const emitter = (() => {
  let currentRow;
  let currentCol;
  const subscriptions = [];

  return {
    subscribe(row, col, callback) {
      subscriptions[row] = subscriptions[row] ?? [];
      subscriptions[row][col] = callback;
      return () => delete subscriptions[row][col];
    },

    highlight(newRow, newCol) {
      subscriptions.forEach((row, rowIndex) => {
        row.forEach((callback, colIndex) => {
          const wasHighlighted = rowIndex === currentRow || colIndex === currentCol;
          const isHighlighted = rowIndex === newRow || colIndex === newCol;
          // Only notify if the highlighting for this row has changed. We could optimize this loop to
          // only run for the changed rows, but you're unlikely to see noticable gains.
          if (wasHighlighted !== isHighlighted) {
            callback(isHighlighted);
          }
        });
      });

      // Update the currently highlighted cell, otherwise you'll never unhighlight the old ones.
      currentRow = newRow;
      currentCol = newCol;
    },
  };
})();

export default function Table() {


  const ColumnHeader = () => (
    <tr>
      <th></th>
      {values.map(({ label }, index) => (
        <th className="labelCol" key={index}>
          {label}
        </th>
      ))}
    </tr>
  );

  const RowHeader = ({ label }) => <td className="labelRow">{label}</td>;

  const TableCell = ({ row, col, x, y }) => {
    const ref = useRef();

    useEffect(() => {
      emitter.subscribe(row, col, (isHighlighted) => {
        if (ref.current) {
          // Directly update the class on the DOM node
          ref.current.classList.toggle('highlight-cell', isHighlighted);
        }
      });
    }, [col, row]);

    return (
      <td onMouseEnter={() => emitter.highlight(row, col)}>
        <div key={col} className={getStyle({ x, y })} title={getTitle({ x, y })} ref={ref}>
          {getSign({ x, y })}
        </div>
      </td>
    );
  };

  const Row = ({ x, row }) =>
    values.map(({ y }, col) => <TableCell key={col} row={row} col={col} x={x} y={y} />);

  const Rows = () =>
    values.map(({ x, label }, row) => (
      <tr key={row}>
        <RowHeader label={label} />
        <Row x={x} row={row} />
      </tr>
    ));

  return (
       <table onMouseLeave={() => emitter.highlight()}>
        <caption>Caption</caption>
        <thead>
          <ColumnHeader />
        </thead>
        <tbody>
          <Rows />
        </tbody>
      </table>

  );
}
