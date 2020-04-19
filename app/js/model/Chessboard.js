const Observable = require("../Observable");
const ChessPiece = require("./ChessPiece");

class Chessboard extends Observable {
  constructor(numCells, cellSize) {
    super();
    this.numCells = numCells;
    this.cellSize = cellSize;
    this.chessPieces = new Map();
    this.className = "Chessboard";
  }

  addChessPiece(chessPiece) {
    this.chessPieces.set(chessPiece.id, chessPiece);
    this.emit("ChessPieceAdded", { chessPiece });
  }

  moveChessPiece(chessPiece, x, y, z) {
    voxel.x = x;
    voxel.y = y;
    voxel.z = z;
    this.emit("ChessPieceMoved", { chessPiece });
  }

  removeVoxel(chessPiece) {
    this.chessPieces.delete(chessPiece.id);
    this.emit("ChessPieceRemoved", { chessPiece });
  }

  getChessPieceById(id) {
    return this.chessPieces.get(id);
  }

  // TODO Get ChessPieceByType

  //   getNonPointerVoxelByPosition(x, y, z) {
  //     for (const voxel of this.voxels.values()) {
  //       if (
  //         voxel.type !== Voxel.Pointer &&
  //         voxel.x === x &&
  //         voxel.y === y &&
  //         voxel.z === z
  //       ) {
  //         return voxel;
  //       }
  //     }

  //     return null;
  //   }
}

module.exports = Chessboard;
