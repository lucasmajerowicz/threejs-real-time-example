import ChessPiece from "./ChessPiece";

export default class Queen extends ChessPiece {
  constructor(id, x, y, name, properties) {
    super(id, x, y, name, properties);
    this.className = "Queen";
  }
}
