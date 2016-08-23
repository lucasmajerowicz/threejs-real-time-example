import VoxelGridViewMediator from './mediator/VoxelGridViewMediator';
import RenderingContext from './RenderingContext';
import { dat } from '../../bin/dat.gui.min.js';
const Voxel = require('../model/Voxel');

export default class MainView {
    constructor(controller, voxelGrid) {
        this.controller = controller;
        this.voxelGrid = voxelGrid;
        this.renderingContext = this.createRenderingContext();
        this.voxelGridMediator = new VoxelGridViewMediator(voxelGrid);
        this.isShiftDown = false;
    }

    createRenderingContext() {
        const domContainer = document.createElement('div');

        document.body.appendChild(domContainer);

        return RenderingContext.getDefault(domContainer);
    }

    initialize() {
        this.initGUI();

        const scene = this.renderingContext.scene;
        const object3D = this.voxelGridMediator.object3D;

        scene.add(object3D);

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.renderingContext.renderer.domElement.addEventListener('mousemove', (e) => this.onDocumentMouseMove(e), false);
        this.renderingContext.renderer.domElement.addEventListener('mousedown', (e) => this.onDocumentMouseDown(e), false);
        document.addEventListener('keydown', (e) => this.onDocumentKeyDown(e), false);
        document.addEventListener('keyup', (e) => this.onDocumentKeyUp(e), false);

        window.addEventListener('resize', (e) => this.onWindowResize(), false);
        this.render();
    }

    render() {
        this.renderingContext.controls.update();
        requestAnimationFrame(() => this.render());

        this.voxelGridMediator.onFrameRenderered();
        this.renderingContext.renderer.render(this.renderingContext.scene, this.renderingContext.camera);
    }

    onWindowResize() {
        this.renderingContext.camera.aspect = window.innerWidth / window.innerHeight;
        this.renderingContext.camera.updateProjectionMatrix();

        this.renderingContext.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    initGUI() {
        const types = {'brick': Voxel.Brick, 'crate': Voxel.Crate, 'water': Voxel.Water, 'stone': Voxel.Stone};

        this.uiSettings = {
            type: Voxel.Stone
        };
        const gui = new dat.GUI();

        gui.add(this.uiSettings, "type", types);
    }

    onDocumentMouseMove(event) {
        const cell = this.computeCellMouseIntersection(event);

        if (cell) {
            this.controller.onCellHover(cell);
        }
    }

    onDocumentMouseDown(event) {
        const cell = this.computeCellMouseIntersection(event);

        if (cell) {
            this.controller.onCellClicked(cell, this.isShiftDown, this.uiSettings);
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

        this.mouse.set(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1);
        this.raycaster.setFromCamera(this.mouse, this.renderingContext.camera);
        const intersects = this.raycaster.intersectObjects(this.voxelGridMediator.objects);

        if (intersects.length > 0) {
            if (!this.isShiftDown || !intersects[0].object.cell) {
                const point = intersects[0].point.add(intersects[0].face.normal);

                return this.voxelGridMediator.getGridCellFromWorldPosition(point);
            } else {
                return intersects[0].object.cell;
            }
        } else {
            return null;
        }
    }
}