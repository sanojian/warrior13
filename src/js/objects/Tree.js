
class Tree extends EngineObject {

	constructor(pos) {

		super(pos, vec2(1), tile(2));

		GLOBAL.mapGrid[pos.y][pos.x] = this;
	}


	isOver(x, y) {

		this.selected = x > this.pos.x - this.size.x / 2 && x < this.pos.x + this.size.x / 2 && y > this.pos.y - this.size.y / 2 && y < this.pos.y + this.size.y / 2;

		return this.selected;
	}

}