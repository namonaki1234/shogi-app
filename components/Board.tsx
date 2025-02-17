'use client';

import Piece from './Piece';
import { BoardState } from '../lib/types';

interface BoardProps {
  board: BoardState;
  onClick: (row: number, col: number) => void;
  selected: { row: number; col: number } | null;
}

export default function Board({ board, onClick, selected }: BoardProps) {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((piece, colIndex) => (
            <div
              key={colIndex}
              className={`cell ${
                selected?.row === rowIndex && selected?.col === colIndex
                  ? 'selected'
                  : ''
              }`}
              onClick={() => onClick(rowIndex, colIndex)}
            >
              <Piece type={piece} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
