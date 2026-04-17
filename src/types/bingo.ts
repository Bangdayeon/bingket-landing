export type BINGO_NUM = '2x2' | '3x3';
export type BINGO_THEME = 'default' | 'rabbit' | 'pig';

export type BingoData = {
  title: string;
  tasks: string[];
  bingoNum: BINGO_NUM;
  theme: BINGO_THEME;
};