import styles from './EqulityGrid.module.css';
import { equality, values } from '../../lib/jsEqulity';

export default function EqulityGrid() {
  const getSign = ({ x, y }) => equality({ x, y }, ['=', '≅', '≠']);
  const getStyle = ({ x, y }) => equality({ x, y }, [styles.strict, styles.loose, styles.notEqual]);
  const getTitle = (x, y, xIndex, yIndex) => {
    const sign = getSign({ x, y });
    const title = equality({ x, y }, ['Strict equality', 'Loose equality', 'Not equal']);
    return `${values[xIndex].label} ${sign} ${values[yIndex].label} (${title})`;
  };

  const header = () =>
    ['', ...values].map(({ label }, index) => (
      <div className={styles.headerLabel} key={index}>
        {label}
      </div>
    ));

  const sidebar = () =>
    values.map(({ label }, index) => (
      <div className={styles.sidebarLabel} key={index}>
        {label}
      </div>
    ));

  const rows = () =>
    values.map(({ x }, xIndex) =>
      values.map(({ y }, yIndex) => (
        <div key={yIndex} className={getStyle({ x, y })} title={getTitle(x, y, xIndex, yIndex)}>
          {getSign({ x, y })}
        </div>
      ))
    );

  return (
    <div className={styles.grid}>
      <div className={styles.header}>{header()}</div>
      <div className={styles.sidebar}>{sidebar()}</div>
      <div /* className={styles.content} */>
        <div className={styles.table}>{rows()}</div>
      </div>
    </div>
  );
}
