import { PieceType } from '../lib/types';

interface PieceProps {
  type: PieceType;
}

export default function Piece({ type }: PieceProps) {
  return <div className={`piece ${type}`}>{type}</div>;
}