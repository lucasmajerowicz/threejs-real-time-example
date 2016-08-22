import Observable from '../Observable';

export default class RemoteClient extends Observable {
    constructor(uri) {
        super();
        this.uri = uri;
    }

    connect() {
        this.ws = new WebSocket(this.uri);

        this.ws.onmessage = (event) => {
            this.emit('MesageReceived', event.data);
        };

        this.ws.onopen = (event) => {
            this.emit('Connected', event);
        };

        this.ws.onclose = function(e) {
            this.send('DisConnected');
        };
    }

    send(data) {
        this.ws.send(data);
    }
}