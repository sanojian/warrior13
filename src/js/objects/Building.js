
class Building extends EngineObject {

	constructor(pos, size, tileInfo) {

		// starts as building site
		super(pos, vec2(1), tile(58));

		this.renderOrder = -10000;

		this.popSupport = 0;
		this.hitPoints = 6;
		this.maxHitPoints = 6;

		this.pos = pos;
		this.builtTileInfo = tileInfo;
		this.builtSize = size;

		GLOBAL.mapGrid[pos.y][pos.x] = this;

		this.needsBuilt = 10;

		this.smokePos = 0;

		for (let i = 0; i < GLOBAL.units.length; i++) {
			const unit = GLOBAL.units[i];
			unit.selected && unit.takeOrder('build', this);
		}

	}

	build(amt) {
		this.needsBuilt = max(0, this.needsBuilt - amt);

		if (this.needsBuilt <= 0) {
			this.tileInfo = this.builtTileInfo;
			this.size = this.builtSize;
			this.renderOrder = -this.pos.y;
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

		if (this.hitPoints <= 0 || this.needsBuilt) {
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

		GLOBAL.drawHealthBar(this.pos.subtract(vec2(0, 1)), this.hitPoints, this.maxHitPoints);

	}

	update() {
		if (!this.needsBuilt && this.smokePos) {
			// show smoke from chimney
			if (Math.random() < .05) {
				GLOBAL.vfxMan.addParticles(this.smokePos, GLOBAL.vfxMan.smoke, 1);
			}
		}
	}

}