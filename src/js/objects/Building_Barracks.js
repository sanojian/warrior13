
class Building_Barracks extends Building {

	constructor(pos) {

		super(pos, vec2(2), tile(vec2(0, 96), vec2(24)));

		this.popSupport = 0;

		GLOBAL.mapGrid[pos.y][pos.x] = this;

		GLOBAL.wood -= 6;
		GLOBAL.stone -= 4;

	}


}