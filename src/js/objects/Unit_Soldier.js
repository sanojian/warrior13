
class Unit_Soldier extends PlayerUnit {

	constructor(pos) {

		super(pos, vec2(1), tile(14));

		this.weapon = 'spear';
		this.hitPoints = 6;

	}

	update() {

		if (this.actionTimer.isSet()) {
			// performing action

			if (this.actionTimer.elapsed()) {
				this.actionTimer.unset();
				this.jumpHeight = 0;

				// attack
				zzfx(...[, .03, 405, , , 0, 3, .1, 8, , , , , .1, 27, .4, .04, .44, .01]); 
				
				this.intentionTarget.takeDamage(1);

			}
			else {
				const percent = this.actionTimer.getPercent();
				if (percent > 0.9) {
					this.actionFrame -= 10;
					this.jumpHeight += percent > 0.95 ? -1 / 32 : 1 / 32;
				}
				else {
					this.actionFrame++;
				}
			}
		}

		else  {
			

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

			const angle = this.destination.subtract(this.pos).angle();
			const dist = this.destination.distance(this.pos);

			if (dist < this.speed) {
				// arrived

				//this.pos = this.destination;
			}
			else {


				// travelling
				const movement = vec2().setAngle(angle, this.speed);
				const newPos = this.pos.add(movement);
				const tileAtPos = GLOBAL.mapMan.getTileAt(newPos);

				if (tileAtPos) {
					// collision
					
					// TODO: go around?

					// walk thru for now at half speed
					this.pos = this.pos.add(vec2().setAngle(angle, this.speed / 4));
					this.mirror = movement.x < 0;
					this.walkFrame++;

					this.renderOrder = -this.pos.y;
				
				}
				else {
					// walk towards destination
					this.pos = newPos;
					this.mirror = movement.x < 0;
					this.walkFrame++;

					this.renderOrder = -this.pos.y;
				}
			}

		}

		if (this.destination.x == this.pos.x || this.destination.y == this.pos.y) {
			this.walkFrame = 0;
		}

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

			pos = pos.add(vec2(0, 6 / 12));
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