const VoxelGrid = require('./js/model/VoxelGrid');
const CommandSerializer = require('./js/remote/CommandSerializer');
const AddVoxelCommand = require('./js/command/AddVoxelCommand');

const voxelGrid = new VoxelGrid(50, 40);
const commandSerializer = new CommandSerializer(voxelGrid);

var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({port: 80});

var nextId = 0;

wss.on('connection', function connection(ws) {
    ws._socket.setKeepAlive(true);

    var connectionId = nextId++;
    var terminationCommand = null;
    wss.clients[wss.clients.length - 1].connectionId = connectionId;

    ws.on('message', function incoming(message) {
        var payload = JSON.parse(message);
        var serializedCommand = JSON.stringify(payload.command);

        if (payload.type === 'RUN') {
            broadcast(serializedCommand);
        } else if (payload.type === 'ON_DISCONNECT') {
            terminationCommand = serializedCommand;
        }
    });

    ws.on('close', function disconnect() {
        if (terminationCommand) {
            broadcast(terminationCommand);
        }
    });

    function broadcast(serializedCommand) {
        executeCommand(JSON.parse(serializedCommand));
        wss.clients.forEach(function each(client) {
            if (client.connectionId != connectionId) {
                client.send(serializedCommand);
            }
        });
    }

    for (const command of getInitCommands()) {
        const serializedCommand = JSON.stringify(command);
        ws.send(serializedCommand);
    }
});


function executeCommand(serializedCommand) {
    const command = commandSerializer.deserialize(serializedCommand);

    if (command) {
        command.execute();
    } else {
        console.error('invalid commmand', serializedCommand);
    }
}

function getInitCommands() {
    const result = [];

    for (const voxel of voxelGrid.voxels.values()) {
        result.push(new AddVoxelCommand(voxelGrid, voxel.id, voxel.x, voxel.y, voxel.z, voxel.type, voxel.color));
    }
    return result;
}