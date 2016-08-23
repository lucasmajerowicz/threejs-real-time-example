import RemoveVoxelCommand from '../command/RemoveVoxelCommand';

export default class VoxelGridRemoteMediator {
    constructor(voxelGrid, remoteClient) {
        this.voxelGrid = voxelGrid;
        this.remoteClient = remoteClient;
        this.remoteClient.addObserver("CommandReceived", (e) => this.onCommandReceived(e));
    }

    initialize() {
        const terminationCommand = new RemoveVoxelCommand(this.voxelGrid, this.voxelGrid.voxelPointer);

        this.remoteClient.setTerminateCommand(terminationCommand);
    }

    onCommandExecuted(command) {
        this.remoteClient.runCommand(command);
    }

    onCommandReceived(command) {
        command.execute();
    }
}