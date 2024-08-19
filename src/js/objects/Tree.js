
class Tree extends EngineObject {

	constructor(pos) {

		super(pos.add(vec2(0, 0.45)), vec2(1, 2), tile(vec2(24, 0), vec2(12, 24)));

		this.renderOrder = -pos.y;
		this.mirror = Math.random() > 0.5;

		GLOBAL.mapGrid[pos.y][pos.x] = this;

		this.wood = 16;
	}


	isOver(x, y) {

		this.selected = x > this.pos.x - this.size.x / 2 && x < this.pos.x + this.size.x / 2 && y > this.pos.y - this.size.y / 2 && y < this.pos.y + this.size.y / 2;

		return this.selected;
	}

	chop(amt) {

		const amount = Math.min(amt, this.wood);

		this.wood -= amt;

		if (this.wood <= 0) {

			GLOBAL.mapGrid[Math.round(this.pos.y)][this.pos.x] = 0;
			GLOBAL.trees.splice(GLOBAL.trees.indexOf(this), 1);
			this.destroy();
		}


		return amount;
	}

}