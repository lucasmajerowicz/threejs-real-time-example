import ChessPiece from "./ChessPiece";

export default class Queen extends ChessPiece {
  constructor(id, x, y, name, player, properties) {
    super(id, x, y, name, player, properties);
    this.className = "Queen";
  }
}
