import React from 'react';
import styles from './styles.module.css';

interface ColoredSquareProps {
  index: number;
}

const colors: string[] = [
  '#4CAF50',
  '#75485E',
  '#CB904D',
  '#255F85',
  '#FFCAE9',
];

export const ColoredSquare: React.FC<ColoredSquareProps> = ({ index }) => {
  return (
    <div
      className={styles.colorSquare}
      style={{ backgroundColor: colors[index] }}
    ></div>
  );
};
