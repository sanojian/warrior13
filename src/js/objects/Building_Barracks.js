
class Building_Barracks extends Building {

	constructor(pos) {

		super(pos, vec2(2), tile(vec2(0, 96), vec2(24)));

		this.hitPoints = 10;
		this.maxHitPoints = 10;

		GLOBAL.mapGrid[pos.y][pos.x] = this;

		GLOBAL.wood -= 6;
		GLOBAL.stone -= 4;

	}

	handleClick(selectedUnits) {

		if (super.handleClick(selectedUnits)) {
			return;
		}

		for (let u = 0; u < selectedUnits.length; u++) {
			selectedUnits[u].takeOrder('shelter', this);
			selectedUnits[u].intentionTarget = this;
		}

		if (!selectedUnits.length) {
			GLOBAL.showMessage('PUT A WORKER\nINSIDE TO UPGRADE');
		}


		return true;
	}

	destroy() {
		// check if there are any inhabitants
		for (let i = 0; i < GLOBAL.units.length; i++) {
			const unit = GLOBAL.units[i];

			if (unit.shelter == this) {
				unit.shelter = undefined;
			}
		}

		super.destroy();
	}
}