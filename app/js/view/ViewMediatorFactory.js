import PawnViewMediator from "./mediator/PawnViewMediator";
import KingViewMediator from "./mediator/KingViewMediator";
import TowerViewMediator from "./mediator/TowerViewMediator";
import HorseViewMediator from "./mediator/HorseViewMediator";
import QueenViewMediator from "./mediator/QueenViewMediator";
import KnightViewMediator from "./mediator/KnightViewMediator";

export default class ViewMediatorFactory {
  getMediator(chessPiece) {
    switch (chessPiece.className) {
      case "Knight":
        return new KnightViewMediator(chessPiece);
      case "King":
        return new KingViewMediator(chessPiece);
      case "Queen":
        return new QueenViewMediator(chessPiece);
      case "Pawn":
        return new PawnViewMediator(chessPiece);
      case "Tower":
        return new TowerViewMediator(chessPiece);
      case "Horse":
        return new HorseViewMediator(chessPiece);
    }
  }
}
