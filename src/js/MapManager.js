
class MapManager {

	constructor() {
	
		const w = 36;
		const h = 36;
		
		this.mapWidth = w;
		this.mapHeight = h;

		//GLOBAL.mapGrid = [];

		const tileLayer = new TileLayer(vec2(-0.5), vec2(w, h));

		for (let y = 0; y < h; y++) {
			//GLOBAL.mapGrid[y] = [];

			for (let x = 0; x < w; x++) {

				// grass
				let tileIndex = 0;
				let rotation = randInt(0, 4);

				const gridValue = GLOBAL.mapGrid[y][x];
				if (gridValue == 'w') {
					tileIndex = 80;
				}
				else if (gridValue == 't') {
					const tree = new Tree(vec2(x, y));
					GLOBAL.mapGrid[y][x] = tree;
					GLOBAL.trees.push(tree);
				}
				else if (gridValue == 's') {
					const stone = new Stone(vec2(x, y));
					GLOBAL.mapGrid[y][x] = stone;
					GLOBAL.stones.push(stone);
				}
				// water tiles
				/*if (x == 0 && y == 0) {
					tileIndex = 82;
					rotation = 1;
				}
				else if (x == w - 1 && y == 0) {
					tileIndex = 82;
					rotation = 0;
				}
				else if (y == 0) {
					tileIndex = 81
					rotation = 0;
				}
				else {
					tileValue = 0;
				}*/


				let info = new TileLayerData(tileIndex, rotation);
				//GLOBAL.mapGrid[y][x] = tileValue || 0;

				tileLayer.setData(vec2(x, y), info);
			
			}
		}

		tileLayer.redraw();

		GLOBAL.buildings.push(new Building_TownHall(vec2(14, 14)));
		GLOBAL.buildings.push(new Building_Barracks(vec2(16, 12)));
		GLOBAL.buildings[GLOBAL.buildings.length - 1].build(10);

		GLOBAL.units.push(
			new Unit_Worker(vec2(14, 12)),
		);

		/*let enemy = new Unit_Enemy(vec2(16, 10));
		enemy.destination = GLOBAL.buildings[0].pos;
		GLOBAL.enemies.push(
			enemy
		);*/

		
	}

	getTileAt(pos) {

		// handle out of bounds
		if (pos.x < 0 || pos.y < 0) {
			return 1;
		}

		return GLOBAL.mapGrid[Math.round(pos.y)][Math.round(pos.x)];

	}


}