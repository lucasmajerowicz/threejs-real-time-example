import MainView from "../view/MainView";
import King from "../model/King";
import Queen from "../model/Queen";
import Tower from "../model/Tower";
import Knight from "../model/Knight";
import Pawn from "../model/Pawn";
import Horse from "../model/Horse";
import { generateUUID } from "../util";

export default class ChessboardController {
  constructor(chessboard, chessboardViewMediator) {
    this.chessboard = chessboard;
    this.chessboardViewMediator = chessboardViewMediator;
    this.view = new MainView(this, chessboard);
    this.view.initialize();

    this.selectedChessPiece = false;
  }

  //   addVoxelPointer() {
  //     const voxelPointerCommand = new AddVoxelCommand(
  //       this.voxelGrid,
  //       generateUUID(),
  //       0,
  //       0,
  //       0,
  //       Voxel.Pointer,
  //       randomColor()
  //     );

  //     this.voxelGrid.voxelPointer = voxelPointerCommand.execute();
  //     this.voxelGridRemoteMediator.onCommandExecuted(voxelPointerCommand);
  //   }
  initialize_chessboard() {
    const chessPieces = [
      [["A", "2"], "Pawn", "White"],
      [["B", "2"], "Pawn", "White"],
      [["C", "2"], "Pawn", "White"],
      [["D", "2"], "Pawn", "White"],
      [["E", "2"], "Pawn", "White"],
      [["F", "2"], "Pawn", "White"],
      [["G", "2"], "Pawn", "White"],
      [["H", "2"], "Pawn", "White"],
      [["A", "1"], "Tower", "White"],
      [["H", "1"], "Tower", "White"],
      [["B", "1"], "Horse", "White"],
      [["G", "1"], "Horse", "White"],
      [["C", "1"], "Knight", "White"],
      [["F", "1"], "Knight", "White"],
      [["D", "1"], "Queen", "White"],
      [["E", "1"], "King", "White"],
      [["A", "7"], "Pawn", "Black"],
      [["B", "7"], "Pawn", "Black"],
      [["C", "7"], "Pawn", "Black"],
      [["D", "7"], "Pawn", "Black"],
      [["E", "7"], "Pawn", "Black"],
      [["F", "7"], "Pawn", "Black"],
      [["G", "7"], "Pawn", "Black"],
      [["H", "7"], "Pawn", "Black"],
      [["A", "8"], "Tower", "Black"],
      [["H", "8"], "Tower", "Black"],
      [["B", "8"], "Horse", "Black"],
      [["G", "8"], "Horse", "Black"],
      [["C", "8"], "Knight", "Black"],
      [["F", "8"], "Knight", "Black"],
      [["D", "8"], "Queen", "Black"],
      [["E", "8"], "King", "Black"],
    ];
    chessPieces.forEach((e) => {
      this.chessboard.addChessPiece(this.createChessPiece(...e));
    });
  }

  onCellHover(cell) {
    const chessCellId = this.chessboard.cellToCellId(cell);
    const chessPiece = this.chessboard.getChessPieceByCellId(chessCellId);

    if (this.isSelected() && !chessPiece) {
      this.chessboard.moveChessPiece(this.selectedChessPiece, chessCellId);
    }

    // this.executeCommand(
    //   new MoveVoxelCommand(
    //     this.voxelGrid,
    //     this.voxelGrid.voxelPointer,
    //     cell[0],
    //     cell[1],
    //     cell[2]
    //   )
    // );
  }

  createChessPiece(chessCellId, name, player) {
    switch (name) {
      case "Knight":
        return new Knight(generateUUID(), ...chessCellId, name, player);
      case "King":
        return new King(generateUUID(), ...chessCellId, name, player);
      case "Queen":
        return new Queen(generateUUID(), ...chessCellId, name, player);
      case "Pawn":
        return new Pawn(generateUUID(), ...chessCellId, name, player);
      case "Tower":
        return new Tower(generateUUID(), ...chessCellId, name, player);
      case "Horse":
        return new Horse(generateUUID(), ...chessCellId, name, player);
    }
    //Throw error chess piece type not recognized
    console.log("ERRROR NOT RECOGNIZED CHESS PIECE TYPE");
    return;
  }

  onCellClicked(cell) {
    const chessCellId = this.chessboard.cellToCellId(cell);
    const chessPiece = this.chessboard.getChessPieceByCellId(chessCellId);

    if (this.isSelected()) {
      this.deselectChessPiece(chessPiece);
    } else {
      this.selectChessPiece(chessPiece);
    }
  }

  selectChessPiece(chessPiece) {
    if (chessPiece && !this.selectedChessPiece) {
      this.chessboard.selectChessPiece(chessPiece);
      this.selectedChessPiece = chessPiece;
    }
  }

  isSelected() {
    if (this.selectedChessPiece) {
      return true;
    }
    return false;
  }

  deselectChessPiece(chessPiece) {
    if (chessPiece && chessPiece.selected) {
      this.chessboard.deselectChessPiece(chessPiece);
      this.selectedChessPiece = false;
    }
  }
  // this.executeCommand(
  //   new AddVoxelCommand(
  //     this.voxelGrid,
  //     generateUUID(),
  //     cell[0],
  //     cell[1],
  //     cell[2],
  //     parseInt(uiSettings.type)
  //   )
  // );

  //   executeCommand(command) {
  //     command.execute(command);
  //     this.voxelGridRemoteMediator.onCommandExecuted(command);
  //   }
}
