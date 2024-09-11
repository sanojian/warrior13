
class MapManager {

	constructor() {
	
		const w = 36;
		const h = 36;
		
		this.mapWidth = w;
		this.mapHeight = h;

		const tileLayer = new TileLayer(vec2(-.5), vec2(w, h));

		for (let y = 0; y < h; y++) 

			for (let x = 0; x < w; x++) {

				// grass
				let tileIndex = 0;
				let rotation = randInt(0, 5);

				const gridValue = GLOBAL.mapGrid[y][x];
				if (gridValue == 'w') 
					tileIndex = 11;

				else if (gridValue == 't') 
					GLOBAL.trees.push(new Tree(vec2(x, y)));

				else if (gridValue == 's') 
					GLOBAL.stones.push(new Stone(vec2(x, y)));

				let info = new TileLayerData(tileIndex, rotation);

				tileLayer.setData(vec2(x, y), info);
			
			}
		

		tileLayer.redraw();

		GLOBAL.buildings.push(
			new Building_TownHall(DEFS.HOME),
			new Building_Temple(vec2(17, 22))
		);

		buildHouse(DEFS.HOME.subtract(vec2(3, 1))).build(10);

		GLOBAL.units.push(new PlayerUnit(vec2(14, 12)));

		GLOBAL.boat = new EngineObject(vec2(33), vec2(3), tile(vec2(48, 132), 24));

		/*let enemy = new Unit_Enemy(vec2(16, 10), 1, tile(6));
		enemy.destination = GLOBAL.buildings[0].pos;
		GLOBAL.enemies.push(
			enemy
		);*/

		
	}

	getTileAt(pos) {

		// handle out of bounds
		if (pos.x < 0 || pos.y < 0)
			return 1;

		return GLOBAL.mapGrid[Math.round(pos.y)][Math.round(pos.x)];

	}


}