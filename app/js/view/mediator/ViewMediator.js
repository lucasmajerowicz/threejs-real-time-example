import Observable from '../../Observable';

export default class ViewMediator extends Observable {
    constructor(model) {
        super();
        this.model = model;
        this.object3D = this.makeObject3D();
        this.object3D.name = model.name;
        this.childMediators = new Map();
        this.object3D.traverse((object3D) => {
            object3D.mediator = this;
        });
    }

    makeObject3D() {
        return new THREE.Object3D();
    }

    addChild(child, mediator) {
        this.childMediators.set(child, mediator);
        this.object3D.add(mediator.object3D);
    }

    removeChild(child) {
        const mediator = this.childMediators.get(child);

        if (mediator) {
            this.object3D.remove(mediator.object3D);
            this.childMediators.delete(child);
        }
    }

    onFrameRenderered() {
        for (const childMediator of this.childMediators.values()) {
            childMediator.onFrameRenderered();
        }
    }
}

