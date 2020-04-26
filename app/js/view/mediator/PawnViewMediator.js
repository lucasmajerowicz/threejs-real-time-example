import ViewMediator from "./ViewMediator";
import "three/examples/js/loaders/OBJLoader";

let loader = new THREE.OBJLoader();
let model = new THREE.Object3D();
loader.load(
  // resource URL
  "chess_pieces/pawn.obj",
  // called when resource is loaded
  function (object) {
    console.log("Loaded");
    model = object;
  },
  // called when loading is in progresses
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function (error) {
    console.log("An error happened");
  }
);

export default class PawnViewMediator extends ViewMediator {
  constructor(chessPiece) {
    super(chessPiece);
  }

  makeObject3D() {
    let geometry;
    model.traverse(function (child) {
      if (child.geometry !== undefined) {
        geometry = child.geometry;
      }
    });
    let mesh = new THREE.Mesh(
      geometry,
      this.getMaterial(this.model.player.toLowerCase())
    );
    return mesh;
  }

  getMaterial(color) {
    return new THREE.MeshPhongMaterial({
      color: new THREE.Color(color),
      opacity: 1,
      transparent: true,
    });
  }
}
