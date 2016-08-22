import CommandSerializer from './CommandSerializer';

export default class VoxelGridRemoteMediator {
    constructor(voxelGrid, remoteClient) {
        this.voxelGrid = voxelGrid;
        this.remoteClient = remoteClient;
        this.commandSerializer = new CommandSerializer(voxelGrid);
        this.remoteClient.addObserver("MesageReceived", (e) => this.onMessageReceived(e));
    }

    onCommandExecuted(command) {
        const serializedCommand = this.commandSerializer.serialize(command);

        this.remoteClient.send(JSON.stringify(serializedCommand));
    }

    onMessageReceived(data) {
        const serializedCommand = JSON.parse(data);
        const command = this.commandSerializer.deserialize(serializedCommand);

        command.execute();
    }

}