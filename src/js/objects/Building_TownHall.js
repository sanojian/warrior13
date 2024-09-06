
class Building_TownHall extends Building {

	constructor(pos) {

		super(pos, vec2(2), tile(vec2(72, 96), 24));

		this.popSupport = 3;
		this.hitPoints = 18;
		this.maxHitPoints = 18;

		this.build(10);

		this.smokePos = pos.subtract(vec2(.3, -.75));
	}

	handleClick(selectedUnits) {

		for (let u = 0; u < selectedUnits.length; u++) {
			// deselect
			selectedUnits[u].selected = false;
		}

		GLOBAL.state = DEFS.STATES.TOWNHALL_MENU;


		return true;
	}
	

	destroy() {
		// end game
		GLOBAL.state = DEFS.STATES.GAME_LOST;

		super.destroy();
	}

}