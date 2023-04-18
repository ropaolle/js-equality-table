import { useState } from "react";
import "./App.css";

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

export default function App() {
  const [mouseCord, setMouseCord] = useState({ x: -1, y: -1 });
  const onMouseEnter = ([y, x]) => setMouseCord({ x: Number(x), y: Number(y) });
  const onMouseLeave = () => setMouseCord({ x: null, y: null });
  const getHoverStyle = ({ x, y }) =>
    x === mouseCord.x || y === mouseCord.y ? "colRowHover" : "";

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

  const Row = ({ x, indexX }) =>
    values.map(({ y }, indexY) => (
      <td>
        <div
          key={indexY}
          id={indexX + ":" + indexY}
          onMouseEnter={(e) => onMouseEnter(e.currentTarget.id.split(":"))}
          className={[
            getStyle({ x, y }),
            getHoverStyle({ y: indexX, x: indexY }),
          ].join(" ")}
          title={getTitle({ x, y })}
        >
          {getSign({ x, y })}
        </div>
      </td>
    ));

  const Rows = () =>
    values.map(({ x, label }, indexX) => (
      <tr key={indexX}>
        <td className="labelRow">{label}</td>
        <Row x={x} indexX={indexX} />
      </tr>
    ));

  return (
    <div className="App">
      <h1>Equality in JavaScript</h1>
      <table onMouseLeave={onMouseLeave}>
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
