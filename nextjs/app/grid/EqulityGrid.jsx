import styles from "./EqulityGrid.module.css";
import { equality, values } from "../lib/jsEqulity";

export default function EqulityGrid() {
  const getSign = ({ x, y }) => equality({ x, y }, ["=", "≅", "≠"]);
  const getStyle = ({ x, y }) =>
    equality({ x, y }, [styles.strict, styles.loose, styles.notEqual]);
  const getTitle = ({ x, y }) =>
    equality({ x, y }, ["Strict equality", "Loose equality", "Not equal"]);

  const header = () => (
    <>
      <div></div>
      {values.map(({ label }, index) => (
        <div className={styles.labelCol} key={index}>
          {label}
        </div>
      ))}
    </>
  );

  const rows = () =>
    values.map(({ x, label }, index) => (
      <>
        <div key={index} className={styles.labelRow}>
          {label}
        </div>
        {values.map(({ y }, index) => (
          <div
            key={index}
            className={[styles.cell, getStyle({ x, y })].join(" ")}
            title={getTitle({ x, y })}
          >
            {getSign({ x, y })}
          </div>
        ))}
      </>
    ));

  return (
    <div className={styles.table}>
      {header()}
      {rows()}
    </div>
  );
}
