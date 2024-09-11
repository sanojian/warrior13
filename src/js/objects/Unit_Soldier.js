
class Unit_Soldier extends PlayerUnit {

	constructor(pos) {

		super(pos, vec2(1), tile(14));

		this.weapon = 'spear';
		this.hitPoints = 6;
		this.maxHitPoints = 6;

		GLOBAL.wood -= 4;
		GLOBAL.stone -= 2;
	}

	update() {

		if (this.actionTimer.isSet()) {

			if (this.actionTimer.elapsed() && this.intentionTarget instanceof Unit_Enemy) {
				this.actionTimer.unset();
				this.jumpHeight = 0;

				// attack
				zzfx(...[, .03, 405, , , 0, 3, .1, 8, , , , , .1, 27, .4, .04, .44, .01]);
				
				this.intentionTarget.takeDamage(1);
			}
		}
		else if (!this.shelter) {

			// look for targets

			this.searchAndDestroy(GLOBAL.enemies, .8, (enemy) => {
				this.actionTimer.set(1);
				this.actionFrame = 0;
				this.intentionTarget = enemy;
			});
			this.searchAndDestroy(GLOBAL.enemies, 3, (enemy) => {
				this.destination = enemy.pos;
			});
		}

		super.update();

	}

	takeDamage(amt) {
		// armor
		super.takeDamage(amt / 2);
	}
		
}