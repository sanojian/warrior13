
class Building_Wall extends Building {

	constructor(pos) {

		super(pos, vec2(1), tile(51));

		this.popSupport = 2;

		GLOBAL.mapGrid[pos.y][pos.x] = this;

		GLOBAL.wood -= 2;
		GLOBAL.stone -= 1;

	}


}