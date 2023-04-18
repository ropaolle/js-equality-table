'use client';
import { useState, memo } from 'react';
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

  const Header = () => (
    <tr>
      <th></th>
      {values.map(({ label }, index) => (
        <th className={[styles.labelCol, getHoverStyle({ x: index })].join(' ')} key={index}>
          {label}
        </th>
      ))}
    </tr>
  );

  const Row = ({ x, indexX }) =>
    values.map(({ y }, indexY) => (
      <td
        key={indexY}
        id={indexX + ':' + indexY}
        onMouseEnter={(e) => onMouseEnter(e.currentTarget.id.split(':'))}
        className={[styles.cell, getStyle({ x, y }), getHoverStyle({ y: indexX, x: indexY })].join(' ')}
        title={getTitle({ x, y })}
      >
        {getSign({ x, y })}
      </td>
    ));

  const Rows = () =>
    values.map(({ x, label }, indexX) => (
      <tr key={indexX}>
        <td className={[styles.labelRow, getHoverStyle({ y: indexX })].join(' ')}>{label}</td>
        <Row x={x} indexX={indexX} />
      </tr>
    ));

  return (
    <table className={styles.table} onMouseLeave={onMouseLeave}>
      <thead>
        <Header />
      </thead>
      <tbody>
        <Rows />
      </tbody>
    </table>
  );
}
