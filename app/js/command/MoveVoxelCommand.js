import Voxel from '../model/Voxel';

export default class MoveVoxelCommand {
    constructor(voxelGrid, voxel, x, y, z) {
        this.voxelGrid = voxelGrid;
        this.voxel = voxel;
        this.x = x;
        this.y = y;
        this.z = z;
        this.className = 'MoveVoxelCommand';
    }

    execute() {
        this.voxelGrid.moveVoxel(this.voxel, this.x, this.y, this.z);
    }
}