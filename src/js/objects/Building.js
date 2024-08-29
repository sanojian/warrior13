
class Building extends EngineObject {

	constructor(pos, size, tileInfo) {

		// starts as building site
		super(pos, vec2(1), tile(58));

		this.renderOrder = -pos.y;

		this.popSupport = 0;
		this.hitPoints = 6;
		this.maxHitPoints = 6;

		this.pos = pos;
		this.builtTileInfo = tileInfo;
		this.builtSize = size;

		GLOBAL.mapGrid[pos.y][pos.x] = this;

		this.needsBuilt = 10;

		for (let i = 0; i < GLOBAL.units.length; i++) {
			const unit = GLOBAL.units[i];
			unit.selected && unit.takeOrder('build', this);
		}
	}

	build(amt) {
		this.needsBuilt = Math.max(0, this.needsBuilt - amt);

		if (this.needsBuilt <= 0) {
			this.tileInfo = this.builtTileInfo;
			this.size = this.builtSize;
			return true;
		}

	}

	handleClick(selectedUnits) {
		if (this.needsBuilt) {
			// resume building
			for (let i = 0; i < selectedUnits.length; i++) {
				selectedUnits[i].takeOrder('build', this);
			}

			return true;
		}
	}

	takeDamage(amt) {

		this.hitPoints -= amt;

		if (this.hitPoints <= 0) {
			this.destroy();
		}
	}
	
	destroy() {

		const index = GLOBAL.buildings.indexOf(this);
		if (index != -1) {
			GLOBAL.buildings.splice(index, 1);
		}
		GLOBAL.mapGrid[Math.round(this.pos.y)][Math.round(this.pos.x)] = 0;

		super.destroy();
	}

	render() {
		super.render();

		// health bar
		if (this.hitPoints < this.maxHitPoints) {
			const pos = this.pos.subtract(vec2(this.maxHitPoints / 12, this.size.y * 7 / 12));

			for (let i = 0; i < this.hitPoints; i++) {
				drawRect(pos, vec2(1 / 12), new Color(217 / 255, 87 / 255, 99 / 255));
				pos.x += 2 / 12;
			}
		}

	}
}