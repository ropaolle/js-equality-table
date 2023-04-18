export const equality = ({ x, y }, values = ['strict', 'loose', 'notEqual']) => {
  if (x === y) return values[0];
  // eslint-disable-next-line eqeqeq
  return x == y ? values[1] : values[2];
};

export const values = [
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
