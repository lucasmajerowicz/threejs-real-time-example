import Observable from '../Observable';

export default class RemoteClient extends Observable {
    constructor(uri, commandSerializer) {
        super();
        this.uri = uri;
        this.commandSerializer = commandSerializer;
    }

    connect() {
        this.ws = new WebSocket(this.uri);

        this.ws.onmessage = (event) => {
            const serializedCommand = JSON.parse(event.data);
            const command = this.commandSerializer.deserialize(serializedCommand);

            if (command) {
                this.emit('CommandReceived', command);
            }

        };

        this.ws.onopen = (event) => {
            this.emit('Connected', event);
        };
    }

    runCommand(command) {
        this.sendCommand('RUN', command);
    }

    setTerminateCommand(command) {
        this.sendCommand('ON_DISCONNECT', command);
    }

    sendCommand(type, command) {
        const serializedCommand = this.commandSerializer.serialize(command);
        const payload = { type, command: serializedCommand};

        this.ws.send(JSON.stringify(payload));
    }
}