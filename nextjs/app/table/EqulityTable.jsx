import styles from './EqulityTable.module.css';
import { equality, values } from '../../lib/jsEqulity';

export default function EqulityTable() {
  const getSign = ({ x, y }) => equality({ x, y }, ['=', '≅', '≠']);
  const getStyle = ({ x, y }) => equality({ x, y }, [styles.strict, styles.loose, styles.notEqual]);
  const getTitle = ({ x, y }) => equality({ x, y }, ['Strict equality', 'Loose equality', 'Not equal']);

  const header = () => (
    <tr>
      <th></th>
      {values.map(({ label }, index) => (
        <th className={styles.labelCol} key={index}>
          {label}
        </th>
      ))}
    </tr>
  );

  const rows = () =>
    values.map(({ x, label }, index) => (
      <tr key={index}>
        <td className={styles.labelRow}>{label}</td>
        {values.map(({ y }, index) => (
          <td key={index} className={[styles.cell, getStyle({ x, y })].join(' ')} title={getTitle({ x, y })}>
            {getSign({ x, y })}
          </td>
        ))}
      </tr>
    ));

  return (
    <table className={styles.table}>
      <thead>{header()}</thead>
      <tbody>{rows()}</tbody>
    </table>
  );
}
