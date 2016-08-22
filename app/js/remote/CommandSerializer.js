import AddVoxelCommand from '../command/AddVoxelCommand';
import MoveVoxelCommand from '../command/MoveVoxelCommand';
import RemoveVoxelCommand from '../command/RemoveVoxelCommand';

export default class CommandSerializer {
    constructor(voxelGrid) {
        this.voxelGrid = voxelGrid;
    }

    serialize(command) {
        switch (command.className) {
            case 'AddVoxelCommand':
                return {
                    className: command.className,
                    id: command.id,
                    x: command.x,
                    y: command.y,
                    z: command.z,
                    type: command.type,
                    color: command.color
                };
            case 'MoveVoxelCommand':
                return {
                    className: command.className,
                    voxel: this.serializeVoxel(command.voxel),
                    x: command.x,
                    y: command.y,
                    z: command.z
                };
            case 'RemoveVoxelCommand':
                return {
                    className: command.className,
                    voxel: this.serializeVoxel(command.voxel)
                };
        }
    }

    deserialize(serializedCommand) {
        switch (serializedCommand.className) {
            case 'AddVoxelCommand':
                return new AddVoxelCommand(
                    this.voxelGrid,
                    serializedCommand.id,
                    serializedCommand.x,
                    serializedCommand.y,
                    serializedCommand.z,
                    serializedCommand.type,
                    serializedCommand.color
                );
            case 'MoveVoxelCommand':
                return new MoveVoxelCommand(
                    this.voxelGrid,
                    this.deserializeVoxel(serializedCommand.voxel),
                    serializedCommand.x,
                    serializedCommand.y,
                    serializedCommand.z
                );
            case 'RemoveVoxelCommand':
                return new RemoveVoxelCommand(
                    this.voxelGrid,
                    this.serializeVoxel(serializedCommand.voxel)
                );
        }
    }

    serializeVoxel(voxel) {
        return {id: voxel.id};
    }

    deserializeVoxel(serializedVoxel) {
        return this.voxelGrid.getVoxelById(serializedVoxel.id);
    }
}