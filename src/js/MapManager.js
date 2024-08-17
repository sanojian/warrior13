
class MapManager {

	constructor() {
	
		const w = 20;
		const h = 20;
		
		this.mapWidth = w;
		this.mapHeight = h;

		GLOBAL.mapGrid = [];

		const tileLayer = new TileLayer(vec2(0), vec2(w, h));

		for (let y = 0; y < h; y++) {
			GLOBAL.mapGrid[y] = [];

			for (let x = 0; x < w; x++) {

				const info = new TileLayerData(0);

				tileLayer.setData(vec2(x, y), info);
			
				GLOBAL.mapGrid[y][x] = 0;
			}
		}

		tileLayer.redraw();

		GLOBAL.units.push(
			new Unit_Worker(vec2(2, 4)),
			new Unit_Worker(vec2(2, 8)),
		);

		GLOBAL.buildings.push(new Building_TownHall(vec2(4, 4)));

		GLOBAL.trees.push(
			new Tree(vec2(4, 6)),
			new Tree(vec2(5, 6)),
			new Tree(vec2(6, 6)),
			new Tree(vec2(5, 7)),
		);
		GLOBAL.stones.push(
			new Stone(vec2(8, 4)),
			new Stone(vec2(7, 8)),
		);
		
	}

	getTileAt(pos) {

		// TODO: handle out of bounds
		return GLOBAL.mapGrid[Math.round(pos.y)][Math.round(pos.x)];

	}
}