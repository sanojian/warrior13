
class Unit_Archer extends PlayerUnit {

	constructor(pos) {

		super(pos, vec2(1), tile(12));

		this.selected = false;

		this.intention = undefined;
		this.intentionTarget = undefined;

		this.weapon = 'bow';

		this.readyFireTimer = new Timer(1);
	}

	update() {

		if (!this.actionTimer.isSet() && this.readyFireTimer.elapsed()) {
			// look for enemies

			for (let i = 0; i < GLOBAL.enemies.length; i++) {
				const enemy = GLOBAL.enemies[i];

				const dist = this.pos.distance(enemy.pos);

				if (dist <= 3) {
					this.actionTimer.set(1 * dist / 3);
					this.actionFrame = 0;
					this.walkFrame = 0;
					this.intentionTarget = enemy;
					this.intention = 'shoot';
					zzfx(...[.7,,334,.13,,.2,4,3,,,,,,,,,,.77,.03,,103]);
					this.readyFireTimer.set(5);
					GLOBAL.vfxMan.showArrow(this.pos, enemy.pos, this.actionTimer);
				}
			}

		}

		super.update();
	}

	render() {

		super.render();

		// bow
		let size = vec2(2);
		let pos = this.pos.add(vec2(0, -2/12))
		if (this.shelter) {

			pos = pos.add(vec2(0, 6 / 12));
			size = vec2(1.6);
		}

		drawTile(
			pos,
			size,
			tile(vec2(72, 72), 24),
			undefined,
			(this.mirror ? 1 : -1) * this.actionFrame / (PI*64),
			this.mirror
		);
	
	}

}