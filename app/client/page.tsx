'use client';

import { useState, useEffect } from 'react';
import Board from '../../components/Board';
import { initializeBoard, movePiece, getPossibleMoves } from '../../lib/gameLogic';

export default function ClientPage() {
  const [board, setBoard] = useState(initializeBoard());
  const [selected, setSelected] = useState<{ row: number; col: number } | null>(null);
  const [isSente, setIsSente] = useState<boolean | null>(null); // プレイヤーが先手か後手か
  const [currentTurn, setCurrentTurn] = useState<'sente' | 'gote'>('sente'); // 現在の手番

  // 先手か後手かを選択するハンドラ
  const handleSelectSide = (isSenteSelected: boolean) => {
    setIsSente(isSenteSelected);
    setCurrentTurn(isSenteSelected ? 'sente' : 'gote'); // 選択に応じて手番を設定
  };

  // 駒をクリックしたときのハンドラ
  const handleClick = (row: number, col: number) => {
    if (isSente === null) return; // 先手か後手が選択されていない場合は何もしない

    const isPlayerTurn = (isSente && currentTurn === 'sente') || (!isSente && currentTurn === 'gote');
    if (!isPlayerTurn) return; // プレイヤーの手番でない場合は何もしない

    if (selected) {
      const newBoard = movePiece(board, selected, { row, col }, isSente);
      setBoard(newBoard);
      setSelected(null);
      setCurrentTurn(currentTurn === 'sente' ? 'gote' : 'sente'); // 手番を切り替え
    } else if (board[row][col]) {
      setSelected({ row, col });
    }
  };

  // 相手の手番でランダムに駒を動かす
  useEffect(() => {
    if (isSente === null) return; // 先手か後手が選択されていない場合は何もしない

    const isPlayerTurn = (isSente && currentTurn === 'sente') || (!isSente && currentTurn === 'gote');
    if (isPlayerTurn) return; // プレイヤーの手番の場合は何もしない

    // 相手の駒をランダムに選択
    const opponentPieces = [];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] && ((isSente && row < 6) || (!isSente && row >= 6))) {
          opponentPieces.push({ row, col });
        }
      }
    }

    if (opponentPieces.length > 0) {
      const randomPiece = opponentPieces[Math.floor(Math.random() * opponentPieces.length)];
      const possibleMoves = getPossibleMoves(board, randomPiece.row, randomPiece.col, !isSente);

      if (possibleMoves.length > 0) {
        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        const newBoard = movePiece(board, randomPiece, randomMove, !isSente);
        setBoard(newBoard);
        setCurrentTurn(currentTurn === 'sente' ? 'gote' : 'sente'); // 手番を切り替え
      }
    }
  }, [currentTurn, isSente, board]);

  // 先手か後手かを選択するウィンドウ
  if (isSente === null) {
    return (
      <div className="selection-window">
        <h1>先手か後手を選択してください</h1>
        <button onClick={() => handleSelectSide(true)}>先手</button>
        <button onClick={() => handleSelectSide(false)}>後手</button>
      </div>
    );
  }

  return (
    <div>
      <h1>将棋アプリ</h1>
      <p>現在の手番: {currentTurn === 'sente' ? '先手' : '後手'}</p>
      <Board board={board} onClick={handleClick} selected={selected} />
    </div>
  );
}