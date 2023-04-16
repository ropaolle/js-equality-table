import { Fragment } from 'react';
import styles from './EqulityGrid.module.css';
import { equality, values } from '@/lib/jsEqulity';

export default function EqulityGrid() {
  const getSign = ({ x, y }) => equality({ x, y }, ['=', '≅', '≠']);
  const getStyle = ({ x, y }) => equality({ x, y }, [styles.strict, styles.loose, styles.notEqual]);
  const getTitle = ({ x, y }) => equality({ x, y }, ['Strict equality', 'Loose equality', 'Not equal']);

  const header = () => (
    <>
      <div></div>
      {values.map(({ label }, index) => (
        <div className={styles.labelCol} key={index + 'label'} id={index + 'label'}>
          {label}
        </div>
      ))}
    </>
  );

  const rows = () =>
    values.map(({ x, label }, indexX) => (
      <Fragment key={indexX}>
        <div key={indexX} className={styles.labelRow}>
          {label}
        </div>
        {values.map(({ y }, indexY) => (
          <div key={indexY} className={getStyle({ x, y })} title={getTitle({ x, y })}>
            {getSign({ x, y })}
          </div>
        ))}
      </Fragment>
    ));

  return (
    <div className={styles.table}>
      {header()}
      {rows()}
    </div>
  );
}
