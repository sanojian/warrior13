
class Building_House extends EngineObject {

	constructor(pos) {

		super(pos, vec2(1), tile(50));

		this.renderOrder = -pos.y;

		GLOBAL.mapGrid[pos.y][pos.x] = this;

	}

	isOver(x, y) {

		return x > this.pos.x - this.size.x / 2 && x < this.pos.x + this.size.x / 2 && y > this.pos.y - this.size.y / 2 && y < this.pos.y + this.size.y / 2;
	}
}