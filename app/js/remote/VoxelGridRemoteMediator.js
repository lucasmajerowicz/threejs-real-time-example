import CommandSerializer from './CommandSerializer';
import RemoveVoxelCommand from '../command/RemoveVoxelCommand';

export default class VoxelGridRemoteMediator {
    constructor(voxelGrid, remoteClient) {
        this.voxelGrid = voxelGrid;
        this.remoteClient = remoteClient;
        this.commandSerializer = new CommandSerializer(voxelGrid);
        this.remoteClient.addObserver("MesageReceived", (e) => this.onMessageReceived(e));

        const terminationCommand = new RemoveVoxelCommand(this.voxelGrid, this.voxelGrid.voxelPointer);

    }

    onCommandExecuted(command) {
        const serializedCommand = this.commandSerializer.serialize(command);

        this.remoteClient.send(JSON.stringify(serializedCommand));
    }

    onMessageReceived(data) {
        const serializedCommand = JSON.parse(data);
        const command = this.commandSerializer.deserialize(serializedCommand);

        if (command) {
            command.execute();
        }
    }
}