import ChessPiece from "./ChessPiece";

export default class King extends ChessPiece {
  constructor(id, x, y, z, name, properties) {
    super(id, x, y, z, name, properties);
    this.className = "King";
  }
}
