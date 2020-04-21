import ChessPiece from "./ChessPiece";

export default class Pawn extends ChessPiece {
  constructor(id, x, y, name, properties) {
    super(id, x, y, name, properties);
    this.className = "Pawn";
  }
}
