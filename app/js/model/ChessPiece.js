import Observable from "../Observable";

export default class ChessPiece extends Observable {
  constructor(id, x, y, z, name, properties = {}) {
    super();
    this.id = id;
    this.x = x;
    this.y = y;
    this.z = z;
    this.name = name;
    this.properties = properties;
  }
}
