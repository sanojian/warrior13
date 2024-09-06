
class Tree extends EngineObject {

	constructor(pos) {

		super(pos.add(vec2(0, .45)), vec2(1, 2), tile(vec2(24, 0), vec2(12, 24)));

		this.renderOrder = -pos.y;
		this.mirror = rand() > .5;

		GLOBAL.mapGrid[pos.y][pos.x] = this;

		this.wood = 8;
	}


	handleClick(selectedUnits) {

		selectedUnits.forEach((unit) => {
			if (!unit.weapon) {
				unit.takeOrder('chop', this);
			}
		});
	}

	chop() {

		this.wood -= 1;

		if (this.wood <= 0) {

			GLOBAL.mapGrid[Math.round(this.pos.y)][this.pos.x] = 0;
			GLOBAL.trees.splice(GLOBAL.trees.indexOf(this), 1);
			this.destroy();
		}
	}

}