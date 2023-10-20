export type Color = string;

export const COLORS: Color[] = [
  '#F56565',
  '#ED8936',
  '#ECC94B',
  '#48BB78',
  '#38B2AC',
  '#4299E1',
  '#667EEA',
  '#9F7AEA',
  '#ED64A6',
  '#F56565',
  '#ED8936',
  '#ECC94B',
  '#48BB78',
  '#38B2AC',
  '#4299E1',
  '#667EEA',
  '#9F7AEA',
  '#ED64A6',
];

export const randomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];
