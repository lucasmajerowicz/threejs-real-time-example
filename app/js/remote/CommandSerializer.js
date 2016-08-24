const AddVoxelCommand = require('../command/AddVoxelCommand');
const MoveVoxelCommand = require('../command/MoveVoxelCommand');
const RemoveVoxelCommand = require('../command/RemoveVoxelCommand');

class CommandSerializer {
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
        let voxel;
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
                voxel = this.deserializeVoxel(serializedCommand.voxel);

                if (voxel) {
                    return new MoveVoxelCommand(
                        this.voxelGrid,
                        voxel,
                        serializedCommand.x,
                        serializedCommand.y,
                        serializedCommand.z
                    );
                }
                break;
            case 'RemoveVoxelCommand':
                voxel = this.deserializeVoxel(serializedCommand.voxel);

                if (voxel) {
                    return new RemoveVoxelCommand(
                        this.voxelGrid,
                        voxel
                    );
                }
                break;
        }

        return null;
    }

    serializeVoxel(voxel) {
        return {id: voxel.id};
    }

    deserializeVoxel(serializedVoxel) {
        return this.voxelGrid.getVoxelById(serializedVoxel.id);
    }
}

module.exports = CommandSerializer;
