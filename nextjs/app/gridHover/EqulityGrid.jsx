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

  const Header = () =>
    ['', ...values].map(({ label }, index) => (
      <div className={styles.headerLabel} key={index}>
        {label}
      </div>
    ));

  const Sidebar = () =>
    values.map(({ label }, index) => (
      <div className={styles.sidebarLabel} key={index}>
        {label}
      </div>
    ));

  const Rows = () =>
    values.map(({ x }, xIndex) =>
      values.map(({ y }, yIndex) => (
        <div key={yIndex} className={getStyle({ x, y })} title={getTitle(x, y, xIndex, yIndex)}>
          {getSign({ x, y })}
        </div>
      ))
    );

  return (
    <div className={styles.grid}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div /* className={styles.content} */>
        <div className={styles.table}>
          <Rows />
        </div>
      </div>
    </div>
  );
}
