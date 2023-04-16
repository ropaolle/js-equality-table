'use client';
import { useState } from 'react';
import styles from './EqulityTable.module.css';
import { equality, values } from '../../lib/jsEqulity';

export default function EqulityTable() {
  const [mouseCord, setMouseCord] = useState({ x: -1, y: -1 });
  const onMouseEnter = ([y, x]) => setMouseCord({ x: Number(x), y: Number(y) });
  const onMouseLeave = () => setMouseCord({ x: null, y: null });
  const getHoverStyle = ({ x, y }) => (x === mouseCord.x || y === mouseCord.y ? styles.labelHover : '');

  const getSign = ({ x, y }) => equality({ x, y }, ['=', '≅', '≠']);
  const getStyle = ({ x, y }) => equality({ x, y }, [styles.strict, styles.loose, styles.notEqual]);
  const getTitle = ({ x, y }) => equality({ x, y }, ['Strict equality', 'Loose equality', 'Not equal']);

  const header = () => (
    <tr>
      <th></th>
      {values.map(({ label }, index) => (
        <th className={[styles.labelCol, getHoverStyle({ x: index })].join(' ')} key={index}>
          {label}
        </th>
      ))}
    </tr>
  );

  const rows = () =>
    values.map(({ x, label }, indexX) => (
      <tr key={indexX}>
        <td className={[styles.labelRow, getHoverStyle({ y: indexX })].join(' ')}>{label}</td>
        {values.map(({ y }, indexY) => (
          <td
            key={indexY}
            id={indexX + ':' + indexY}
            onMouseEnter={(e) => onMouseEnter(e.currentTarget.id.split(':'))}
            className={[styles.cell, getStyle({ x, y }), getHoverStyle({ y: indexX, x:indexY })].join(' ')}
            title={getTitle({ x, y })}
          >
            {getSign({ x, y })}
          </td>
        ))}
      </tr>
    ));

  return (
    <table className={styles.table} onMouseLeave={onMouseLeave}>
      <thead>{header()}</thead>
      <tbody>{rows()}</tbody>
    </table>
  );
}
