
class Building_Farm extends Building {

	constructor(pos) {

		super(pos, vec2(2), tile(vec2(24, 96), vec2(24)));

		GLOBAL.wood -= 6;
		GLOBAL.stone -= 4;

		this.food = 50;
	}

	handleClick(selectedUnits) {

		if (super.handleClick(selectedUnits)) {
			return;
		}

		for (let u = 0; u < selectedUnits.length; u++) {
			selectedUnits[u].takeOrder('farm', this);
		}


		return true;
	}

	farm() {

		this.food -= 1;

		this.food <= 0 && this.destroy();
	}

}