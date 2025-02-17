import { BoardState } from './types';

export const initializeBoard = (): BoardState => {
  // 初期の将棋盤を生成
  return [
    ['香', '桂', '銀', '金', '玉', '金', '銀', '桂', '香'],
    ['', '飛', '', '', '', '', '', '角', ''],
    ['歩', '歩', '歩', '歩', '歩', '歩', '歩', '歩', '歩'],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['歩', '歩', '歩', '歩', '歩', '歩', '歩', '歩', '歩'],
    ['', '角', '', '', '', '', '', '飛', ''],
    ['香', '桂', '銀', '金', '玉', '金', '銀', '桂', '香'],
  ];
};

export const getPossibleMoves = (
  board: BoardState,
  row: number,
  col: number,
  isSente: boolean // プレイヤーが先手かどうか
): { row: number; col: number }[] => {
  const piece = board[row][col];
  const moves: { row: number; col: number }[] = [];

  if (!piece) return moves;

  const direction = isSente ? -1 : 1; // プレイヤーが先手なら上向き（-1）、後手なら下向き（1）

  const addMove = (r: number, c: number) => {
    if (r >= 0 && r < 9 && c >= 0 && c < 9) {
      moves.push({ row: r, col: c });
    }
  };

  switch (piece) {
    case '歩':
      addMove(row + direction, col);
      break;
    case '香':
      for (let r = row + direction; r >= 0 && r < 9; r += direction) {
        addMove(r, col);
        if (board[r][col]) break;
      }
      break;
    case '桂':
      addMove(row + 2 * direction, col - 1);
      addMove(row + 2 * direction, col + 1);
      break;
    case '銀':
      addMove(row + direction, col - 1);
      addMove(row + direction, col);
      addMove(row + direction, col + 1);
      addMove(row - direction, col - 1);
      addMove(row - direction, col + 1);
      break;
    case '金':
    case '玉':
      addMove(row + direction, col - 1);
      addMove(row + direction, col);
      addMove(row + direction, col + 1);
      addMove(row, col - 1);
      addMove(row, col + 1);
      addMove(row - direction, col);
      break;
    case '飛':
      for (let r = row - 1; r >= 0; r--) {
        addMove(r, col);
        if (board[r][col]) break;
      }
      for (let r = row + 1; r < 9; r++) {
        addMove(r, col);
        if (board[r][col]) break;
      }
      for (let c = col - 1; c >= 0; c--) {
        addMove(row, c);
        if (board[row][c]) break;
      }
      for (let c = col + 1; c < 9; c++) {
        addMove(row, c);
        if (board[row][c]) break;
      }
      break;
    case '角':
      for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r--, c--) {
        addMove(r, c);
        if (board[r][c]) break;
      }
      for (let r = row - 1, c = col + 1; r >= 0 && c < 9; r--, c++) {
        addMove(r, c);
        if (board[r][c]) break;
      }
      for (let r = row + 1, c = col - 1; r < 9 && c >= 0; r++, c--) {
        addMove(r, c);
        if (board[r][c]) break;
      }
      for (let r = row + 1, c = col + 1; r < 9 && c < 9; r++, c++) {
        addMove(r, c);
        if (board[r][c]) break;
      }
      break;
  }

  return moves;
};

export const movePiece = (
  board: BoardState,
  from: { row: number; col: number },
  to: { row: number; col: number },
  isSente: boolean // プレイヤーが先手かどうか
): BoardState => {
  const newBoard = board.map((row) => [...row]);
  const piece = newBoard[from.row][from.col];

  if (!piece) return board;

  const possibleMoves = getPossibleMoves(newBoard, from.row, from.col, isSente);
  const isValidMove = possibleMoves.some(
    (move) => move.row === to.row && move.col === to.col
  );

  if (isValidMove) {
    newBoard[to.row][to.col] = piece;
    newBoard[from.row][from.col] = '';
  }

  return newBoard;
};