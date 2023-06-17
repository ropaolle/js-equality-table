export const meta = () => {
  return [{ title: "New Remix App" }];
};

const equality = ({ x, y }, values = ["strict", "loose", "notEqual"]) => {
  if (x === y) return values[0];
  // eslint-disable-next-line eqeqeq
  return x == y ? values[1] : values[2];
};

const values = [
  { label: "true", x: true, y: true },
  { label: "false", x: false, y: false },
  { label: "1", x: 1, y: 1 },
  { label: "0", x: 0, y: 0 },
  { label: "-1", x: -1, y: -1 },
  { label: '"true"', x: "true", y: "true" },
  { label: '"false"', x: "false", y: "false" },
  { label: '"1"', x: "1", y: "1" },
  { label: '"0"', x: "0", y: "0" },
  { label: '"-1"', x: "-1", y: "-1" },
  { label: '""', x: "", y: "" },
  { label: "null", x: null, y: null },
  { label: "undefined", x: undefined, y: undefined },
  { label: "Infinity", x: Infinity, y: Infinity },
  { label: "-Infinity", x: -Infinity, y: -Infinity },
  { label: "[]", x: [], y: [] },
  { label: "{}", x: {}, y: {} },
  { label: "[[]]", x: [[]], y: [[]] },
  { label: "[0]", x: [0], y: [0] },
  { label: "[1]", x: [1], y: [1] },
  { label: "NaN", x: NaN, y: NaN },
];

export default function Index() {
  const getSign = ({ x, y }) => equality({ x, y }, ["=", "≅", "≠"]);
  const getStyle = ({ x, y }) =>
    equality({ x, y }, ["strict", "loose", "notEqual"]);
  const getTitle = ({ x, y }) =>
    equality({ x, y }, ["Strict equality", "Loose equality", "Not equal"]);

  const Header = () => (
    <tr>
      <th></th>
      {values.map(({ label }, index) => (
        <th className="labelCol" key={index}>
          {label}
        </th>
      ))}
    </tr>
  );

  const Rows = () =>
    values.map(({ x, label }, index) => (
      <tr key={index}>
        <td className="labelRow">{label}</td>
        {values.map(({ y }, index) => (
          <td key={index}>
            <div className={getStyle({ x, y })} title={getTitle({ x, y })}>
              {getSign({ x, y })}
            </div>
          </td>
        ))}
      </tr>
    ));

  return (
    <div className="App">
      <h1>Welcome to Remix</h1>
      <table>
        <thead>
          <Header />
        </thead>
        <tbody>
          <Rows />
        </tbody>
      </table>
    </div>
  );
}
