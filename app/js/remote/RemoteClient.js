import Observable from '../Observable';

export default class RemoteClient extends Observable {
    constructor(uri) {
        super();
        this.uri = uri;
    }

    connect() {
        this.ws = new WebSocket(this.uri);

        this.ws.onmessage = (event) => {
            this.emit('MesageReceived', event);
        };

        this.ws.onopen = (event) => {
            this.emit('Connected', event);
        };
    }
}