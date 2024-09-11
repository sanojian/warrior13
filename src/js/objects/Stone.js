
class Stone extends EngineObject {

	constructor(pos) {

		super(pos, vec2(1), tile(8));

		this.renderOrder = -pos.y;

		GLOBAL.mapGrid[pos.y][pos.x] = this;

		this.stone = 48;
	}

	handleClick(selectedUnits) {

		selectedUnits.forEach((unit) => {
			if (!unit.weapon) {
				unit.takeOrder('mine', this);
			}
		});
	}

	mine() {

		this.stone -= 1;

		if (this.stone <= 0) {

			GLOBAL.mapGrid[this.pos.y][this.pos.x] = 0;
			GLOBAL.stones.splice(GLOBAL.stones.indexOf(this), 1);
			this.destroy();
		}
	}

}