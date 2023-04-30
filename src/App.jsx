import { useRef, useEffect } from 'react';
import './App.css';

const equality = ({ x, y }, values = ['strict', 'loose', 'notEqual']) => {
  if (x === y) return values[0];
  // eslint-disable-next-line eqeqeq
  return x == y ? values[1] : values[2];
};

const values = [
  { label: 'true', x: true, y: true },
  { label: 'false', x: false, y: false },
  { label: '1', x: 1, y: 1 },
  { label: '0', x: 0, y: 0 },
  { label: '-1', x: -1, y: -1 },
  { label: '"true"', x: 'true', y: 'true' },
  { label: '"false"', x: 'false', y: 'false' },
  { label: '"1"', x: '1', y: '1' },
  { label: '"0"', x: '0', y: '0' },
  { label: '"-1"', x: '-1', y: '-1' },
  { label: '""', x: '', y: '' },
  { label: 'null', x: null, y: null },
  { label: 'undefined', x: undefined, y: undefined },
  { label: 'Infinity', x: Infinity, y: Infinity },
  { label: '-Infinity', x: -Infinity, y: -Infinity },
  { label: '[]', x: [], y: [] },
  { label: '{}', x: {}, y: {} },
  { label: '[[]]', x: [[]], y: [[]] },
  { label: '[0]', x: [0], y: [0] },
  { label: '[1]', x: [1], y: [1] },
  { label: 'NaN', x: NaN, y: NaN },
];

const emitter = (() => {
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

      // Update the currently highlighted cell, otherwise you'll never unhighlight the old ones.
      currentRow = newRow;
      currentCol = newCol;
    },
  };
})();

export default function App() {
  const getSign = ({ x, y }) => equality({ x, y }, ['=', '≅', '≠']);
  const getStyle = ({ x, y }) => equality({ x, y }, ['strict', 'loose', 'notEqual']);
  const getTitle = ({ x, y }) =>
    equality({ x, y }, ['Strict equality', 'Loose equality', 'Not equal']);

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
      <td>
        <div
          key={col}
          className={getStyle({ x, y })}
          title={getTitle({ x, y })}
          onMouseEnter={() => emitter.highlight(row, col)}
          ref={ref}
        >
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
    <div className="App">
      <h1>Equality in JavaScript</h1>
      <table onMouseLeave={() => emitter.highlight(-1, -1)}>
        <thead>
          <ColumnHeader />
        </thead>
        <tbody>
          <Rows />
        </tbody>
      </table>
    </div>
  );
}
