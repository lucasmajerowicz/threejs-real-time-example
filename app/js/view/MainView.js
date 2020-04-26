import ChessboardViewMediator from "./mediator/ChessboardViewMediator";
import RenderingContext from "./RenderingContext";
import { dat } from "../../bin/dat.gui.min.js";
const Voxel = require("../model/Voxel");

export default class MainView {
  constructor(controller, chessboard) {
    this.controller = controller;
    this.chessboard = chessboard;
    this.renderingContext = this.createRenderingContext();
    this.chessboardMediator = new ChessboardViewMediator(chessboard);
    this.isShiftDown = false;
  }

  createRenderingContext() {
    const domContainer = document.createElement("div");

    document.body.appendChild(domContainer);

    return RenderingContext.getDefault(domContainer);
  }

  initialize() {
    this.initGUI();
    const scene = this.renderingContext.scene;
    const object3D = this.chessboardMediator.object3D;

    scene.add(object3D);

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.mouseMoved = false;
    this.renderingContext.renderer.domElement.addEventListener(
      "mousemove",
      (e) => this.onDocumentMouseMove(e),
      false
    );
    this.renderingContext.renderer.domElement.addEventListener(
      "mouseup",
      (e) => this.onDocumentMouseUp(e),
      false
    );
    this.renderingContext.renderer.domElement.addEventListener(
      "mousedown",
      (e) => this.onDocumentMouseDown(e),
      false
    );
    document.addEventListener(
      "keydown",
      (e) => this.onDocumentKeyDown(e),
      false
    );
    document.addEventListener("keyup", (e) => this.onDocumentKeyUp(e), false);

    window.addEventListener("resize", (e) => this.onWindowResize(), false);
    this.render();
  }

  render() {
    this.renderingContext.controls.update();
    requestAnimationFrame(() => this.render());

    this.chessboardMediator.onFrameRenderered();
    this.renderingContext.renderer.render(
      this.renderingContext.scene,
      this.renderingContext.camera
    );
  }

  onWindowResize() {
    this.renderingContext.camera.aspect =
      window.innerWidth / window.innerHeight;
    this.renderingContext.camera.updateProjectionMatrix();

    this.renderingContext.renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );
  }

  initGUI() {
    const names = {
      knight: "Knight",
      king: "King",
      queen: "Queen",
      pawn: "Pawn",
      tower: "Tower",
      horse: "Horse",
    };

    this.uiSettings = {
      name: "King",
    };
    const gui = new dat.GUI();

    gui.add(this.uiSettings, "name", names);
  }

  onDocumentMouseMove(event) {
    const cell = this.computeCellMouseIntersection(event);

    if (cell) {
      this.controller.onCellHover(cell);
    }
    this.mouseMoved = true;
  }

  onDocumentMouseDown(event) {
    this.mouseMoved = false;
  }

  onDocumentMouseUp(event) {
    if (!this.mouseMoved) {
      const cell = this.computeCellMouseIntersection(event);

      if (cell) {
        this.controller.onCellClicked(cell, this.isShiftDown, this.uiSettings);
      }
    }
  }

  onDocumentKeyDown(event) {
    switch (event.keyCode) {
      case 16:
        this.isShiftDown = true;
        break;
    }
  }

  onDocumentKeyUp(event) {
    switch (event.keyCode) {
      case 16:
        this.isShiftDown = false;
        break;
    }
  }

  computeCellMouseIntersection(event) {
    event.preventDefault();

    this.mouse.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    this.raycaster.setFromCamera(this.mouse, this.renderingContext.camera);
    const intersects = this.raycaster.intersectObjects(
      this.chessboardMediator.objects
    );

    if (intersects.length > 0) {
      if (!this.isShiftDown || !intersects[0].object.cell) {
        const point = intersects[0].point;
        return this.chessboardMediator.getGridCellFromWorldPosition(point);
      } else {
        return intersects[0].object.cell;
      }
    } else {
      return null;
    }
  }
}
