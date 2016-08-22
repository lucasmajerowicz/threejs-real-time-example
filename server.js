var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({port: 8081});

wss.on('connection', function connection(ws) {
    var connectionId = Math.random();
    wss.clients[wss.clients.length - 1].connectionId = connectionId;

    ws.on('message', function incoming(message) {
        console.log(message);
        wss.clients.forEach(function each(client) {
            if (client.connectionId != connectionId) {
                client.send(message);
            }
        });
    });
});

