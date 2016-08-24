const Voxel = require('../model/Voxel');

class RemoveVoxelCommand {
    constructor(voxelGrid, voxel) {
        this.voxelGrid = voxelGrid;
        this.voxel = voxel;
        this.className = 'RemoveVoxelCommand';
    }

    execute() {
        this.voxelGrid.removeVoxel(this.voxel);
    }
}

module.exports = RemoveVoxelCommand;
