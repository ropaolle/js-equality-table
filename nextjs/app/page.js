// import Image from "next/image";
// import { Inter } from "next/font/google";
// import styles from "./page.module.css";
// const inter = Inter({ subsets: ["latin"] });

const title = "Equality in JavaScript";
const framework = "Create React App with TypeScript";

const equalities = {
  strict: { sign: "=", className: "strict", title: "Strict equality" },
  loose: { sign: "≅", className: "loose", title: "Loose equality" },
  notEqual: { sign: "≠", className: "not-equal", title: "Not equal" },
};

const equality = ({ x, y }) => {
  if (x === y) return "strict";
  // eslint-disable-next-line eqeqeq
  return x == y ? "loose" : "notEqual";
};

const getSign = ({ x, y }) => equalities[equality({ x, y })].sign;
const getClass = ({ x, y }) => equalities[equality({ x, y })].className;
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

export default function Home() {
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
    <main className="App">
      <h1>{title}</h1>
      <h3>{framework}</h3>

      <table className="equality-table">
        <thead>{header()}</thead>
        <tbody>{rows()}</tbody>
      </table>
    </main>
    // <main className={styles.main}>
    //   <h2 className={inter.className}>
    //     Docs <span>-&gt;</span>
    //   </h2>
    //   <p className={inter.className}>
    //     Find in-depth information about Next.js features and API.
    //   </p>
    // </main>
  );
}
