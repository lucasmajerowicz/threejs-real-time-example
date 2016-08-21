export default class VoxelGridRemoteMediator {
    constructor(voxelGrid, remoteClient) {
        this.voxelGrid = voxelGrid;
        this.remoteClient = remoteClient;
        voxelGrid.addObserver("VoxelAdded", (e) => this.onVoxelAdded(e));
        voxelGrid.addObserver("VoxelMoved", (e) => this.onVoxelMoved(e));
    }

    onVoxelMoved(e) {
        const voxel = e.voxel;

        console.log(voxel);
    }

    onVoxelAdded(e) {
        const voxel = e.voxel;

        console.log(voxel);
    }
}