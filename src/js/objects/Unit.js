

class Unit extends EngineObject {

	constructor(pos, size, tileInfo) {

		super(pos, size, tileInfo);

		this.destination = pos;

		this.hitPoints = 3;
		this.maxHitPoints = 3;
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

	takeDamage(amt) {

		this.hitPoints -= amt;

		GLOBAL.vfxMan.addParticles(this.pos, GLOBAL.vfxMan.bloodDrops);
		//GLOBAL.speak('ow!', undefined, 2, 2);

		if (this.hitPoints <= 0) {

			this.destroy();
		}

	}

	destroy() {

		const array = this instanceof PlayerUnit ? GLOBAL.units : GLOBAL.enemies;

		const index = array.indexOf(this);
		if (index != -1) {
			array.splice(index, 1);
		}

		super.destroy();
	}

	render() {

		// pre render

		let pos = this.pos.add(vec2(0, this.step ? 1 / 12 : this.jumpHeight));

		if (this.shelter) 
			pos = this.pos.add(vec2(0, 8 / 12));

		this.step = Math.floor(this.walkFrame / 10) % 2;
		// render
		drawTile(
			pos,
			this.size,
			this.step ? this.walkTile : this.tileInfo,
			undefined,
			undefined,
			this.mirror
		);

		// item in hand
		let tilePos;
		if (this.intention == 'chop' || this.weapon == 'axe')
			tilePos = vec2(24);
		else if (this.intention == 'mine')
			tilePos = vec2(48, 24);
		else if (this.intention == 'build')
			tilePos = vec2(72, 24);
		else if (this.intention == 'farm')
			tilePos = vec2(48, 72);
		else if (this.weapon == 'sword')
			tilePos = vec2(72, 48);
		else if (this.weapon == 'spear')
			tilePos = vec2(0, 24);
		else if (this.weapon == 'bow')
			tilePos = vec2(72);

		tilePos && this.drawTool(tilePos);


		!this.shelter && GLOBAL.drawHealthBar(this.pos.subtract(vec2(0, 8/12)), this.hitPoints, this.maxHitPoints);
	}

	drawTool(tilePos) {

		let pos = this.pos.add(vec2(0, this.step ? -3 / 12 : -2 / 12 + this.jumpHeight))
		if (this.shelter)
			pos = this.pos.add(vec2(0, 6 / 12));

		drawTile(
			pos,
			vec2(2),
			tile(tilePos, 24),
			undefined,
			(this.mirror ? 1 : -1) * this.actionFrame / (PI*12),
			this.mirror
		);
	}

	searchAndDestroy(array, range, callback) {

		let closest = Infinity;
		let target;
		for (let i = 0; i < array.length; i++) {
			const unit = array[i];
			const dist = this.pos.distance(unit.pos);
			if (dist < range  && dist < closest) {
				target = unit;
				closest = dist;
			}
		}
		target && callback(target);
	}

}