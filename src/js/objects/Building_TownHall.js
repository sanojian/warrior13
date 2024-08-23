
class Building_TownHall extends EngineObject {

	constructor(pos) {

		super(pos, vec2(2), tile(vec2(0, 24), 24));

		this.renderOrder = -pos.y;

		this.popSupport = 2;
		this.hitPoints = 24;

		GLOBAL.mapGrid[pos.y][pos.x] = this;

	}

	handleClick(selectedUnits) {

		if (!selectedUnits.length) {
			GLOBAL.state = DEFS.STATES.TOWNHALL_MENU;
		}

		for (let u = 0; u < selectedUnits.length; u++) {
			selectedUnits[u].takeOrder('store', this);
		}
	}
	


}