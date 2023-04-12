import React from "react";
import "./App.css";

const title = "Equality in JavaScript";
const framework = "Create React App with TypeScript";

enum EqualityType {
  Strict = "Strict",
  Loose = "Loose",
  NotEqual = "NotEqual",
}

interface Equalities {
  sign: string;
  className: string;
  title: string;
}

type EqualityRecord = {
  [key in EqualityType]: Equalities;
};

const equalities: EqualityRecord = {
  Strict: { sign: "=", className: "strict", title: "Strict equality" },
  Loose: { sign: "≅", className: "loose", title: "Loose equality" },
  NotEqual: { sign: "≠", className: "not-equal", title: "Not equal" },
};

const equality = ({ x, y }: any) => {
  if (x === y) return EqualityType.Strict;
  // eslint-disable-next-line eqeqeq
  return x == y ? EqualityType.Loose : EqualityType.NotEqual;
};

const getSign = ({ x, y }: any) => equalities[equality({ x, y })].sign;
const getClass = ({ x, y }: any) => equalities[equality({ x, y })].className;
const getTitle = ({ x, y }: any) => equalities[equality({ x, y })].title;

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

function App() {
  const header = () => (
    <tr>
      <th></th>
      {values.map(({ label }, index) => (
        <th key={index}>{label}</th>
      ))}
    </tr>
  );

  const rows = () =>
    values.map(({ x, label }, index) => (
      <tr key={index}>
        <td>{label}</td>
        {values.map(({ y }, index) => (
          <td key={index} className={getClass({ x, y })}>
            <div className="cell" title={getTitle({ x, y })}>
              {getSign({ x, y })}
            </div>
          </td>
        ))}
      </tr>
    ));

  return (
    <div className="App">
      <h1>{title}</h1>
      <h3>{framework}</h3>

      <table className="equality-table">
        <thead>{header()}</thead>
        <tbody>{rows()}</tbody>
      </table>
    </div>
  );
}

export default App;
