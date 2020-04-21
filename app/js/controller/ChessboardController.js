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

  onCellHover(cell) {
    console.log("Hovering");
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

  onCellClicked(cell, isShiftDown, uiSettings) {
    const chessCellId = this.chessboard.cellToCellId(cell);
    const chessPiece = this.chessboard.getChessPieceByCellId(
      "".concat(...chessCellId)
    );
    if (chessPiece) {
      if (isShiftDown) {
        this.chessboard.removeChessPiece(chessPiece);
        // this.executeCommand(new RemoveVoxelCommand(this.voxelGrid, voxel));
      }
    } else {
      const newChessPiece = this.createChessPiece(chessCellId, uiSettings.name);
      this.chessboard.addChessPiece(newChessPiece);
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
  }

  //   executeCommand(command) {
  //     command.execute(command);
  //     this.voxelGridRemoteMediator.onCommandExecuted(command);
  //   }
}
