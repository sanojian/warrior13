
class Building_TownHall extends Building {

	constructor(pos) {

		super(pos, vec2(2), tile(vec2(72, 96), 24));

		this.popSupport = 3;
		this.hitPoints = 18;
		this.maxHitPoints = 18;

		this.build(10);

		this.smokePos = pos.subtract(vec2(0.3, -0.75));
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
		GLOBAL.state = DEFS.STATES.GAME_LOST;

		super.destroy();
	}

}