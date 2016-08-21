import MainView from '../view/MainView';
import Voxel from '../model/Voxel';

export default class VoxelGridController {
    constructor(voxelGrid) {
        this.voxelGrid = voxelGrid;
        this.view = new MainView(this, voxelGrid);
        this.view.initialize();

        this.voxelPointer = new Voxel(0, 0, 0, Voxel.Pointer, 0xff0000);
        this.voxelGrid.addVoxel(this.voxelPointer);
    }

    onCellHover(cell) {
        this.voxelGrid.moveVoxel(this.voxelPointer, cell[0], cell[1], cell[2]);
    }

    onCellClicked(cell, isShiftDown, uiSettings) {
        if (isShiftDown) {
            const voxel = this.voxelGrid.voxels.find(voxel => voxel.type !== Voxel.Pointer && voxel.x === cell[0] && voxel.y === cell[1] && voxel.z === cell[2]);

            if (voxel) {
                this.voxelGrid.removeVoxel(voxel);
            }
        } else {
            this.voxelGrid.addVoxel(new Voxel(cell[0], cell[1], cell[2], parseInt(uiSettings.type)));
        }
    }
}
