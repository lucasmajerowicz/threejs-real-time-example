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
    //   this.executeCommand(
    //     new MoveVoxelCommand(
    //       this.voxelGrid,
    //       this.voxelGrid.voxelPointer,
    //       cell[0],
    //       cell[1],
    //       cell[2]
    //     )
    //   );
  }

  createChessPiece(cell, name) {
    switch (name) {
      case "Knight":
        return new Knight(generateUUID(), cell[0], cell[1], cell[2], "Knight");
      case "King":
        return new King(generateUUID(), cell[0], cell[1], cell[2], "King");
      case "Queen":
        return new Queen(generateUUID(), cell[0], cell[1], cell[2], "Queen");
      case "Pawn":
        return new Pawn(generateUUID(), cell[0], cell[1], cell[2], "Pawn");
      case "Tower":
        return new Tower(generateUUID(), cell[0], cell[1], cell[2], "Tower");
      case "Horse":
        return new Horse(generateUUID(), cell[0], cell[1], cell[2], "Horse");
    }
    //Throw error chess piece type not recognized
    console.log("ERRROR NOT RECOGNIZED CHESS PIECE TYPE");
    return;
  }

  onCellClicked(cell, isShiftDown, uiSettings) {
    if (isShiftDown) {
      const chessPiece = this.chessboard.getChessPieceByPosition(
        cell[0],
        cell[1],
        cell[2]
      );
      if (chessPiece) {
        this.chessboard.removeChessPiece(chessPiece);
        // this.executeCommand(new RemoveVoxelCommand(this.voxelGrid, voxel));
      }
    } else {
      const chessPiece = this.createChessPiece(cell, uiSettings.name);
      this.chessboard.addChessPiece(chessPiece);
      //   this.executeCommand(
      //     new AddVoxelCommand(
      //       this.voxelGrid,
      //       generateUUID(),
      //       cell[0],
      //       cell[1],
      //       cell[2],
      //       parseInt(uiSettings.type)
      //     )
      //   );
    }
  }

  //   executeCommand(command) {
  //     command.execute(command);
  //     this.voxelGridRemoteMediator.onCommandExecuted(command);
  //   }
}
