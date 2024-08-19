
class Stone extends EngineObject {

	constructor(pos) {

		super(pos, vec2(1), tile(8));

		this.renderOrder = -pos.y;

		GLOBAL.mapGrid[pos.y][pos.x] = this;

		this.stone = 50;
	}


	isOver(x, y) {

		this.selected = x > this.pos.x - this.size.x / 2 && x < this.pos.x + this.size.x / 2 && y > this.pos.y - this.size.y / 2 && y < this.pos.y + this.size.y / 2;

		return this.selected;
	}

	mine(amt) {

		const amount = Math.min(amt, this.stone);

		this.stone -= amt;

		if (this.stone <= 0) {

			GLOBAL.mapGrid[this.pos.y][this.pos.x] = 0;
			GLOBAL.trees.splice(GLOBAL.trees.indexOf(this), 1);
			this.destroy();
		}


		return amount;
	}

}