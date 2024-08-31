
class Building_Temple extends Building {

	constructor(pos) {

		super(pos, vec2(2), tile(vec2(48, 96), vec2(24)));

		GLOBAL.mapGrid[pos.y][pos.x] = this;

		this.hitPoints = 18;
		this.maxHitPoints = 18;
	}

	handleClick(selectedUnits) {

		if (super.handleClick(selectedUnits)) {
			return;
		}

		for (let u = 0; u < selectedUnits.length; u++) {
			selectedUnits[u].takeOrder('pray', this);
		}


		return true;
	}


}