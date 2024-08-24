

class Unit extends EngineObject {

	constructor(pos, size, tileInfo) {

		super(pos, size, tileInfo);

		this.destination = pos;

		this.hitpoints = 3;
		this.speed = 1 / 48;
		this.walkFrame = 0;
		this.walkTile = tile(tileInfo.pos.add(vec2(12, 0), tileInfo.size));

		this.intention = undefined;
		this.intentionTarget = undefined;

		this.actionTimer = new Timer;
		this.actionFrame = 0;
		this.jumpHeight = 0;

		this.weapon = undefined;
	}

	takeOrder() {
		this.shelter = undefined;
	}

	takeDamage(amt) {

		this.hitpoints -= amt;

		if (this.hitpoints <= 0) {

			if (this instanceof PlayerUnit) {
				GLOBAL.units.splice(GLOBAL.units.indexOf(this), 1);
			}
			else if (this instanceof Unit_Enemy) {
				GLOBAL.enemies.splice(GLOBAL.enemies.indexOf(this), 1);
			}

			this.destroy();
		}
	}

	render() {

		// pre render

		if (this.shelter) {

			drawTile(
				this.pos.add(vec2(0,  6 / 12)),
				vec2(0.8),
				this.tileInfo
			);
			return;
		}

		const step = Math.floor(this.walkFrame / 10) % 2;
		// render
		drawTile(
			this.pos.add(vec2(0, step ? 1 / 12 : this.jumpHeight)),
			vec2(1),
			step ? this.walkTile : this.tileInfo,
			undefined,
			undefined,
			this.mirror
		);
	}
}