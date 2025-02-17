// |はユニオン型を表す
export type PieceType =
  | '香'
  | '桂'
  | '銀'
  | '金'
  | '玉'
  | '飛'
  | '角'
  | '歩'
  | '';

export type BoardState = PieceType[][];
