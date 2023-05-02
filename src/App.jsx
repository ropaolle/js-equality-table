import './App.css';
import Table from './components/table';

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

export default function App() {
  const headers = values.map(({ label }) => label);

  const getStyle = ({ x, y }) => equality({ x, y });
  const getSign = ({ x, y }) => equality({ x, y }, ['=', '≅', '≠']);
  const getTitle = ({ x, y }) =>
    equality({ x, y }, ['Strict equality', 'Loose equality', 'Not equal']);

  const Cell = ({ index, x, y }) => (
    <div key={index} className={getStyle({ x, y })} title={getTitle({ x, y })}>
      {getSign({ x, y })}
    </div>
  );

  const row = (x) => values.map(({ y }, index) => <Cell index={index} x={x} y={y} />);
  const rows = values.map(({ x }) => row(x));

  return (
    <div className="App">
      <h1>Equality in JavaScript</h1>
      <Table columnHeaders={headers} rowHeaders={headers} rows={rows} caption="RopaOlle, 2023." />
    </div>
  );
}
