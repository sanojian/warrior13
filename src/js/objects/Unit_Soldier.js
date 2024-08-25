
class Unit_Soldier extends PlayerUnit {

	constructor(pos) {

		super(pos, vec2(1), tile(14));

		this.weapon = 'spear';
		this.hitPoints = 6;

	}

	update() {

		if (!this.actionTimer.isSet() ) {

			// look for targets
			let closest = Infinity;
			for (let i = 0; i < GLOBAL.enemies.length; i++) {
				const unit = GLOBAL.enemies[i];
				const dist = this.pos.distance(unit.pos);
				if (dist < 0.8 && !unit.shelter) {
					this.actionTimer.set(1);
					this.actionFrame = 0;
					this.intentionTarget = unit;
					return;
				}
				else if (dist < 3 && dist < closest) {
					this.destination = unit.pos;
					closest = dist;
				}
			}
		}

		super.update();

	}
		
	render() {

		// pre render

		// render
		super.render();

		// post render

		// spear
		let size = vec2(2);
		let pos = this.pos.add(vec2(0, -2/12))
		if (this.shelter) {

			pos = pos.add(vec2(0, 8 / 12));
			size = vec2(1.6);
		}

		const moveAmt = this.actionFrame / 240;
		drawTile(
			pos.add(vec2((this.mirror ? 1 : -1) * moveAmt, -moveAmt)),
			size,
			tile(vec2(72, 96), 24),
			undefined,
			0,
			this.mirror
		);
	

	}
}