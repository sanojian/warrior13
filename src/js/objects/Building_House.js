
class Building_House extends EngineObject {

	constructor(pos) {

		super(pos, vec2(1), tile(58));

		this.renderOrder = -pos.y;

		this.pos = pos;
		this.popSupport = 1;

		GLOBAL.mapGrid[pos.y][pos.x] = this;

		GLOBAL.wood -= 6;
		GLOBAL.stone -= 4;

		this.needsBuilt = 10;

		for (let i = 0; i < GLOBAL.units.length; i++) {
			const unit = GLOBAL.units[i];
			unit.selected && unit.takeOrder('build', this);
		}
	}

	build(amt) {
		this.needsBuilt = Math.max(0, this.needsBuilt - amt);

		if (this.needsBuilt <= 0) {
			this.tileInfo = tile(50);
		}
	}

	isOver(x, y, selectedUnits) {

		const clicked = x > this.pos.x - this.size.x / 2 && x < this.pos.x + this.size.x / 2 && y > this.pos.y - this.size.y / 2 && y < this.pos.y + this.size.y / 2;
		
		if (clicked && this.needsBuilt) {
			// resume building
			for (let i = 0; clicked && i < selectedUnits.length; i++) {
				selectedUnits[i].takeOrder('build', this);
			}
		}

		return clicked;
	}
}