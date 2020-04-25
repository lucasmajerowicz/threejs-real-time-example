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

    this.selected = false;
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
    const pawn_positions = [
      [["A", "2"], "Pawn"],
      [["B", "2"], "Pawn"],
      [["C", "2"], "Pawn"],
      [["D", "2"], "Pawn"],
      [["E", "2"], "Pawn"],
      [["F", "2"], "Pawn"],
      [["G", "2"], "Pawn"],
      [["H", "2"], "Pawn"],
      [["A", "1"], "Tower"],
      [["H", "1"], "Tower"],
      [["B", "1"], "Horse"],
      [["G", "1"], "Horse"],
      [["C", "1"], "Knight"],
      [["F", "1"], "Knight"],
      [["D", "1"], "Queen"],
      [["E", "1"], "King"],
    ];
    pawn_positions.forEach((e) => {
      this.chessboard.addChessPiece(this.createChessPiece(...e));
    });
  }

  onCellHover(cell) {
    console.log("Hovering");

    const chessCellId = this.chessboard.cellToCellId(cell);
    const chessPiece = this.chessboard.getChessPieceByCellId(chessCellId);

    if (this.isSelected() && !chessPiece) {
      this.chessboard.moveChessPiece(this.selected, chessCellId);
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

  createChessPiece(chessCellId, name) {
    switch (name) {
      case "Knight":
        return new Knight(generateUUID(), ...chessCellId, "Knight");
      case "King":
        return new King(generateUUID(), ...chessCellId, "King");
      case "Queen":
        return new Queen(generateUUID(), ...chessCellId, "Queen");
      case "Pawn":
        return new Pawn(generateUUID(), ...chessCellId, "Pawn");
      case "Tower":
        return new Tower(generateUUID(), ...chessCellId, "Tower");
      case "Horse":
        return new Horse(generateUUID(), ...chessCellId, "Horse");
    }
    //Throw error chess piece type not recognized
    console.log("ERRROR NOT RECOGNIZED CHESS PIECE TYPE");
    return;
  }

  onCellClicked(cell) {
    const chessCellId = this.chessboard.cellToCellId(cell);
    const chessPiece = this.chessboard.getChessPieceByCellId(chessCellId);

    if (this.isSelected()) {
      this.deselectChessPiece();
    } else {
      this.selectChessPiece(chessPiece);
    }
  }

  selectChessPiece(chessPiece) {
    if (chessPiece && !this.selected) {
      this.selected = chessPiece;
    }
  }

  isSelected() {
    if (this.selected) {
      return true;
    }
    return false;
  }

  deselectChessPiece() {
    this.selected = false;
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
