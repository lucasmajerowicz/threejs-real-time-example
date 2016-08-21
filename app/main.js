import 'babel-polyfill';
import 'three';
import VoxelGrid from './js/model/VoxelGrid';
import Voxel from './js/model/Voxel';
import VoxelGridController from './js/controller/VoxelGridController';
import RemoteClient from './js/remote/RemoteClient';
import VoxelGridRemoteMediator from './js/remote/mediator/VoxelGridRemoteMediator';

const voxelGrid = new VoxelGrid(10, 40);

const voxelGridController = new VoxelGridController(voxelGrid);


const remoteClient = new RemoteClient('ws://localhost:8081');

remoteClient.addObserver("Connected", (e) => {
    const voxelGridRemoteMediator = new VoxelGridRemoteMediator(voxelGrid, remoteClient);

});

remoteClient.connect();



//voxelGrid.addVoxel(5,5,0, Voxel.Water);
//voxelGrid.addVoxel(5,5,1, Voxel.Stone);












/*
var ws = new WebSocket('ws://localhost:8081', 'echo-protocol');

ws.onmessage = function (event) {
    console.log('received ', event.data);
}


ws.onopen = function (event) {
    ws.send("Here's some text that the server is urgently awaiting!");
};

window.ws = ws;


import {getUrlParameterByName} from './js/util';
import 'babel-polyfill';
import 'three';
import Controller from './js/Controller';
import RenderingContextFactory from './js/view/RenderingContextFactory';

const renderingContextFactory = new RenderingContextFactory(getUrlParameterByName('mode'));
const controller = new Controller(renderingContextFactory);


*/
