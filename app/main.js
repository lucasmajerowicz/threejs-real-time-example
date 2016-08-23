import 'babel-polyfill';
import 'three';
import VoxelGrid from './js/model/VoxelGrid';
import Voxel from './js/model/Voxel';
import VoxelGridController from './js/controller/VoxelGridController';
import RemoteClient from './js/remote/RemoteClient';
import VoxelGridRemoteMediator from './js/remote/VoxelGridRemoteMediator';
import CommandSerializer from './js/remote/CommandSerializer';

const voxelGrid = new VoxelGrid(10, 40);

const remoteClient = new RemoteClient('ws://localhost:8081', new CommandSerializer(voxelGrid));

remoteClient.addObserver("Connected", (e) => {
    console.log('connected');
    const voxelGridRemoteMediator = new VoxelGridRemoteMediator(voxelGrid, remoteClient);
    const voxelGridController = new VoxelGridController(voxelGrid, voxelGridRemoteMediator);
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
