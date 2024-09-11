
class Unit_Archer extends PlayerUnit {

	constructor(pos) {

		super(pos, vec2(1), tile(12));

		this.selected = false;

		this.weapon = 'bow';

		this.readyFireTimer = new Timer(1);

		GLOBAL.wood -= 4;
		GLOBAL.stone -= 2;
	}

	update() {

		if (!this.actionTimer.isSet() && this.readyFireTimer.elapsed()) {
			// look for enemies

			this.searchAndDestroy(GLOBAL.enemies, this.shelter ? 4 : 3, (enemy) => {
				this.actionTimer.unset()
				this.actionFrame = 0;
				this.walkFrame = 0;
				this.intentionTarget = enemy;
				this.intention = 'shoot';
				zzfx(...[.7, , 334, .13, , .2, 4, 3, , , , , , , , , , .77, .03, , 103]);
				this.readyFireTimer.set(4);
				GLOBAL.vfxMan.showArrow(this.pos.copy(), enemy);

			});
		}

		super.update();
	}

}