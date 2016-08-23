const Voxel = require('./js/model/Voxel');

var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({port: 8081});

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
        console.log(serializedCommand);
        wss.clients.forEach(function each(client) {
            if (client.connectionId != connectionId) {
                client.send(serializedCommand);
            }
        });
    }
});

