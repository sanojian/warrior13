
class Building_House extends Building {

	constructor(pos) {

		super(pos, vec2(1), tile(50));

		this.popSupport = 2;

		GLOBAL.mapGrid[pos.y][pos.x] = this;

		GLOBAL.wood -= 6;
		GLOBAL.stone -= 4;

	}


}