import * as React from "react";

const pageStyles = {
  textAlign: "center",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
};

const tableStyles = {
  marginLeft: "auto",
  marginRight: "auto",
};

const th = {
  writingMode: "vertical-rl",
  textAlign: "right",
  fontWeight: 400,
};

// :first-child
const td = {
  textAlign: "right",
  paddingRight: "8px",
};

const cell = {
  backgroundColor: "#ece3e2",
  border: "1px solid #cecece",
  borderRadius: 2,
  textAlign: "center",
  color: "#c9c9c9",
  lineHeight: "20px",
};

const strict = {
  ...cell,
  color: "#5f5f5f",
  borderColor: "#464646",
  backgroundColor: "#818181",
  fontWeight: "bold",
};

const loose = {
  ...cell,
  borderColor: "#817d7d",
  backgroundColor: "#dbdbdb",
  color: "#817d7d",
};

const title = "Equality in JavaScript";
const framework = "Create React App with TypeScript";

const equalities = {
  strict: { sign: "=", style: strict, title: "Strict equality" },
  loose: { sign: "≅", style: loose, title: "Loose equality" },
  notEqual: { sign: "≠", style: cell, title: "Not equal" },
};

const equality = ({ x, y }) => {
  if (x === y) return "strict";
  // eslint-disable-next-line eqeqeq
  return x == y ? "loose" : "notEqual";
};

const getSign = ({ x, y }) => equalities[equality({ x, y })].sign;
const getClass = ({ x, y }) => equalities[equality({ x, y })].style;
const getTitle = ({ x, y }) => equalities[equality({ x, y })].title;

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

const IndexPage = () => {
  const header = () => (
    <tr>
      <th>&nbsp;</th>
      {values.map(({ label }, index) => (
        <th style={th} key={index}>
          {label}
        </th>
      ))}
    </tr>
  );

  const rows = () =>
    values.map(({ x, label }, index) => (
      <tr key={index}>
        <td style={td}>{label}</td>
        {values.map(({ y }, index) => (
          <td key={index}>
            <div style={getClass({ x, y })} title={getTitle({ x, y })}>
              {getSign({ x, y })}
            </div>
          </td>
        ))}
      </tr>
    ));

  return (
    <main style={pageStyles}>
      <h1>{title}</h1>
      <h3>{framework}</h3>

      <table style={tableStyles}>
        <thead>{header()}</thead>
        <tbody>{rows()}</tbody>
      </table>
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
