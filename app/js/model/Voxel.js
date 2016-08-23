class Voxel {
    constructor(id, x, y, z, type, color) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.z = z;
        this.type = type;
        this.color = color;
        this.className = 'Voxel';
    }
}

Voxel.Brick = 0;
Voxel.Crate = 1;
Voxel.Water = 2;
Voxel.Stone = 3;
Voxel.Pointer = 4;

module.exports = Voxel;
