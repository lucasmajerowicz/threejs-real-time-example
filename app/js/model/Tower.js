import ChessPiece from "./ChessPiece";

export default class Tower extends ChessPiece {
  constructor(id, x, y, name, player, properties) {
    super(id, x, y, name, player, properties);
    this.className = "Tower";
  }
}
