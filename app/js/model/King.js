import ChessPiece from "./ChessPiece";

export default class King extends ChessPiece {
  constructor(id, x, y, name, player, properties) {
    super(id, x, y, name, player, properties);
    this.className = "King";
  }
}
