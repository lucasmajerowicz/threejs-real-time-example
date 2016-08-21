import Observable from '../Observable';
import Voxel from './Voxel';

export default class VoxelGrid extends Observable {
    constructor(numCells, cellSize) {
        super();
        this.numCells = numCells;
        this.cellSize = cellSize;
        this.voxels = [];
        this.className = 'VoxelGrid';
    }

    addVoxel(voxel) {
        this.voxels.push(voxel);
        this.emit('VoxelAdded', { voxel });
    }

    moveVoxel(voxel, x, y, z) {
        voxel.x = x;
        voxel.y = y;
        voxel.z = z;

        this.emit('VoxelMoved', { voxel });
    }

    removeVoxel(voxel) {
        this.voxels.splice(this.voxels.indexOf(voxel), 1);

        this.emit('VoxelRemoved', { voxel });
    }

}