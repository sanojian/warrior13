
class Stone extends EngineObject {

	constructor(pos) {

		super(pos, vec2(1), tile(8));

		this.renderOrder = -pos.y;

		GLOBAL.mapGrid[pos.y][pos.x] = this;

		this.stone = 32;
	}

	handleClick(selectedUnits) {

		for (let u = 0; u < selectedUnits.length; u++) {
			const unit = selectedUnits[u];
			if (unit instanceof Unit_Worker) {
				unit.takeOrder('mine', this);
			}
		}
	}

	mine(amt) {

		const amount = min(amt, this.stone);

		this.stone -= amt;

		if (this.stone <= 0) {

			GLOBAL.mapGrid[this.pos.y][this.pos.x] = 0;
			GLOBAL.stones.splice(GLOBAL.stones.indexOf(this), 1);
			this.destroy();
		}


		return amount;
	}

}