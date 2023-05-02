import { useRef, useEffect } from 'react';

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
      // console.log('DUDE', newRow)
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

export default function Table({ columnHeaders, rowHeaders, rows, caption }) {
  const Header = () => (
    <tr>
      {rowHeaders && <th />}
      {columnHeaders.map((label, index) => (
        <th key={index}>{label}</th>
      ))}
    </tr>
  );

  const Cell = ({ content, row, col }) => {
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
      <td key={col} onMouseEnter={() => emitter.highlight(row, col)} ref={ref}>
        {content}
      </td>
    );
  };

  const Row = ({ row, rowIndex }) =>
    row.map((content, colIndex) => <Cell content={content} row={rowIndex} col={colIndex} />);

  const Rows = () =>
    rows.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {rowHeaders && <th>{rowHeaders[rowIndex]}</th>}
        <Row row={row} rowIndex={rowIndex} />
      </tr>
    ));

  return (
    <table onMouseLeave={() => emitter.highlight()}>
      <caption>{caption}</caption>
      <thead>
        <Header />
      </thead>
      <tbody>
        <Rows />
      </tbody>
    </table>
  );
}
