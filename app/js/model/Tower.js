import ChessPiece from "./ChessPiece";

export default class Tower extends ChessPiece {
  constructor(id, x, y, z, name, properties) {
    super(id, x, y, z, name, properties);
    this.className = "Tower";
  }
}
