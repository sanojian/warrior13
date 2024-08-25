
class Building_TownHall extends Building {

	constructor(pos) {

		super(pos, vec2(2), tile(vec2(0, 24), 24));

		this.popSupport = 3;
		this.hitPoints = 24;
		this.maxHitPoints = 24;

		GLOBAL.mapGrid[pos.y][pos.x] = this;

		this.build(10);
	}

	handleClick(selectedUnits) {

		if (!selectedUnits.length) {
			GLOBAL.state = DEFS.STATES.TOWNHALL_MENU;
		}

		for (let u = 0; u < selectedUnits.length; u++) {
			selectedUnits[u].takeOrder('store', this);
		}

		return true;
	}
	

	destroy() {
		// end game

		super.destroy();
	}

}