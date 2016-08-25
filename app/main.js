import 'babel-polyfill';
import 'three';
import Voxel from './js/model/Voxel';
import VoxelGridController from './js/controller/VoxelGridController';
import RemoteClient from './js/remote/RemoteClient';
import VoxelGridRemoteMediator from './js/remote/VoxelGridRemoteMediator';

const CommandSerializer = require('./js/remote/CommandSerializer');
const VoxelGrid = require('./js/model/VoxelGrid');

const voxelGrid = new VoxelGrid(50, 40);

const remoteClient = new RemoteClient('wss://104.197.115.91:80', new CommandSerializer(voxelGrid));

remoteClient.addObserver("Connected", (e) => {
    console.log('connected');
    const voxelGridRemoteMediator = new VoxelGridRemoteMediator(voxelGrid, remoteClient);
    const voxelGridController = new VoxelGridController(voxelGrid, voxelGridRemoteMediator);
});

remoteClient.connect();