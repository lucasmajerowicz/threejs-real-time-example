import "babel-polyfill";
import "three";
// import Voxel from "./js/model/Voxel";
import ChessboardController from "./js/controller/ChessboardController";
// import RemoteClient from "./js/remote/RemoteClient";
import ChessboardViewMediator from "./js/view/mediator/ChessboardViewMediator";
import Chessboard from "./js/model/Chessboard";

// const CommandSerializer = require("./js/remote/CommandSerializer");

const chessboard = new Chessboard(8, 8);
const controller = new ChessboardController(
  chessboard,
  new ChessboardViewMediator(chessboard)
);
// const remoteClient = new RemoteClient('ws://localhost:8081', new CommandSerializer(voxelGrid));

// remoteClient.addObserver("Connected", (e) => {
//     console.log('connected');
//     const voxelGridRemoteMediator = new VoxelGridRemoteMediator(voxelGrid, remoteClient);
//     const voxelGridController = new VoxelGridController(voxelGrid, voxelGridRemoteMediator);
// });

// remoteClient.connect();
