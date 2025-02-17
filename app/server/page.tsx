import { initializeBoard } from '../../lib/gameLogic';
import Board from '../../components/Board';

export default function ServerPage() {
  const initialBoard = initializeBoard();

  return (
    <div>
      <h1>将棋アプリ</h1>
      <Board board={initialBoard} />
    </div>
  );
}