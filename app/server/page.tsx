import { useState } from 'react';
import { initializeBoard } from '../../lib/gameLogic';
import Board from '../../components/Board';

export default function ServerPage() {
  const initialBoard = initializeBoard();

  // 選択された駒の位置を管理する状態
  const [selected, setSelected] = useState<{ row: number; col: number } | null>(null);

  // セルがクリックされたときの処理
  const handleClick = (row: number, col: number) => {
    setSelected({ row, col });
  };

  return (
    <div>
      <h1>将棋アプリ</h1>
      <Board board={initialBoard} onClick={handleClick} selected={selected} />
    </div>
  );
}
