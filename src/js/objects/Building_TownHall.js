
class Building_TownHall extends EngineObject {

	constructor(pos) {

		super(pos, vec2(2), tile(vec2(0, 2 * 12), 24));

	}

	isOver(x, y) {

		return x > this.pos.x - this.size.x / 2 && x < this.pos.x + this.size.x / 2 && y > this.pos.y - this.size.y / 2 && y < this.pos.y + this.size.y / 2;
	}
}