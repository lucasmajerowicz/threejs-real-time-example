import Voxel from '../model/Voxel';

export default class RemoveVoxelCommand {
    constructor(voxelGrid, voxel) {
        this.voxelGrid = voxelGrid;
        this.voxel = voxel;
        this.className = 'RemoveVoxelCommand';
    }

    execute() {
        this.voxelGrid.removeVoxel(this.voxel);
    }
}