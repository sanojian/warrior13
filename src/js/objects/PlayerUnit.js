
class PlayerUnit extends Unit {

	constructor(pos, size, tileInfo) {

		super(pos, size, tileInfo);

		this.selected = false;

		this.wood = 0;
		this.stone = 0;
		this.food = 0;

		this.prayTimer = new Timer();
	}

	isOver(x, y) {

		const select = x > this.pos.x - this.size.x / 2 && x < this.pos.x + this.size.x / 2 && y > this.pos.y - this.size.y / 2 && y < this.pos.y + this.size.y / 2;

		if (select && !this.selected) {
			
			if (this.shelter && this.shelter instanceof Building_Barracks && this instanceof Unit_Worker) {
				GLOBAL.state = DEFS.STATES.TRAIN_MENU;
			}
			else if (this instanceof Unit_Worker) {
				GLOBAL.state = DEFS.STATES.BUILD_MENU;
			}
			const chance = Math.random();
			GLOBAL.speak(chance < 0.3 ? 'what' : chance < 0.6 ? 'huh?' : 'ready');
		}

		this.selected = select;
		return this.selected;
	}

	takeOrder(order, target) {

		super.takeOrder();

		this.actionTimer.unset();
		this.prayTimer.unset();
		if (this.oldTileInfo) {
			this.tileInfo = this.oldTileInfo;
			delete this.oldTileInfo;
		}
		this.intention = order;
		this.destination = target ? target.pos : this.pos;
		this.actionFrame = 0;

		this.selected = false;
		GLOBAL.state = 0;

		const possibleSpeak = {
			chop: ['k', 'choppa', 'yep?'],
			mine: ['k', 'yep?'],
			build: ['k', 'hamma?', 'yep?'],
			store: ['hoard', 'stow', 'store'],
			shelter: ['shellta', 'safety'],
			move: ['goin', 'yep?', 'k'],
			farm: ['fooda', 'grub', 'k'],
			pray: ['woah low low']
		};

		if (order && possibleSpeak[order]) {
			GLOBAL.speak(possibleSpeak[order][Math.floor(Math.random() * possibleSpeak[order].length)]);
		}
	}

	update() {

		if (this.prayTimer.isSet() && this.prayTimer.elapsed()) {
			// animate praying
			if (this.oldTileInfo) {
				this.tileInfo = this.oldTileInfo;
				delete this.oldTileInfo;
			}
			else {
				this.oldTileInfo = this.tileInfo;
				this.tileInfo = tile(3);
			}
			this.prayTimer.set(1);
		
		}

		if (this.actionTimer.isSet()) {
			// performing action

			if (this.actionTimer.elapsed()) {
				this.actionTimer.unset();
				this.jumpHeight = 0;
				if (this.intention == 'shoot') {
					// TODO: check if target still exists
					this.intentionTarget.takeDamage(1);
					zzfx(...[,.03,405,,,0,3,.1,8,,,,,.1,27,.4,.04,.44,.01]); 
					
				}
				else if (this.intention == 'chop') {
					// TODO: check if tree still exists
					const wood = this.intentionTarget.chop(1);
					wood && zzfx(...[,.03,405,,,0,3,.1,8,,,,,.1,27,.4,.04,.44,.01]); 
					this.wood += wood;
				}
				else if (this.intention == 'pray') {
					// TODO: check if temple still exists
					const chance = (25 - GLOBAL.mana) / 25;
					if (Math.random() < chance) {
						zzfx(...[.9, , 600, , , 0, , 3.9, , -1, 650, .05, .04, , , , .08, .84, .18]);
						GLOBAL.mana++;
					}
				}
				else if (this.intention == 'farm') {
					// TODO: check if tree still exists
					const food = this.intentionTarget.farm(1);
					food && zzfx(...[,.03,405,,,0,3,.1,8,,,,,.1,27,.4,.04,.44,.01]); 
					this.food += food;
				}
				else if (this.intention == 'mine') {
					// TODO: check if stone still exists
					const stone = this.intentionTarget.mine(1);
					stone && zzfx(...[.5,0,1793,,.05,.02,3,.7,,-1,,,,.1,,,,.63,.02,,-1400]);
					this.stone += stone;
				}
				else if (this.intention == 'build') {
					// TODO: check if building still exists
					const built = this.intentionTarget.build(1);
					zzfx(...[, .03, 405, , , 0, 3, .1, 8, , , , , .1, 27, .4, .04, .44, .01]);
					if (this.intentionTarget.needsBuilt == 0 && this.intentionTarget instanceof Building_Farm) {
						this.takeOrder('farm', this.intentionTarget);
					}
					else {
						built && this.takeOrder();
					}
				}

				if (this.wood + this.stone + this.food>= 3) {
					// return to storage
					this.prevIntention = this.intention;
					this.prevDestination = this.destination;
					this.intention = 'store';
					this.destination = DEFS.HOME;
				}
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

		else if (this.destination && (this.destination.x != this.pos.x || this.destination.y != this.pos.y)) {
			
			const angle = this.destination.subtract(this.pos).angle();
			const dist = this.destination.distance(this.pos);

			if (dist < this.speed) {
				// arrived
				this.pos = this.destination;
				if (this.intention == 'chop') {
					// look for new target
					let closest = Infinity;
					let target;
					for (let i = 0; i < GLOBAL.trees.length; i++) {
						const tree = GLOBAL.trees[i];
						const dist = tree.pos.subtract(this.pos).length();
						if (dist < closest) {
							target = tree;
							closest = dist;
						}
					}
					if (target) {
						this.destination = target.pos;
					} 
				}
			}
			else {
				// travelling
				const movement = vec2().setAngle(angle, this.speed);
				const newPos = this.pos.add(movement);
				const tileAtPos = GLOBAL.mapMan.getTileAt(newPos);

				if (tileAtPos) {
					// collision
					if (tileAtPos instanceof Tree && this.intention == 'chop') {
						
						this.actionTimer.set(1);
						this.actionFrame = 0;
						this.walkFrame = 0;
						this.intentionTarget = tileAtPos;
					}
					else if (tileAtPos instanceof Stone && this.intention == 'mine') {
						
						this.actionTimer.set(1);
						this.actionFrame = 0;
						this.walkFrame = 0;
						this.intentionTarget = tileAtPos;
					}
					else if (tileAtPos instanceof Building_Temple && this.intention == 'pray') {
						
						this.actionTimer.set(3);
						this.prayTimer.set(0.8);
						this.oldTileInfo = this.tileInfo;
						this.tileInfo = tile(3);
						this.actionFrame = 0;
						this.walkFrame = 0;
						this.intentionTarget = tileAtPos;
					}
					else if (tileAtPos instanceof Building && this.intention == 'build' && tileAtPos.needsBuilt) {
						
						this.actionTimer.set(1);
						this.actionFrame = 0;
						this.walkFrame = 0;
						this.intentionTarget = tileAtPos;
					}
					else if (tileAtPos instanceof Building_Farm && this.intention == 'farm') {

						this.actionTimer.set(1);
						this.actionFrame = 0;
						this.walkFrame = 0;
						this.intentionTarget = tileAtPos;
						
					}
					else if (tileAtPos == this.intentionTarget && this.intention == 'shelter') {

						// make sure it is not already occupied
						for (let i = 0; i < GLOBAL.units.length; i++) {
							if (GLOBAL.units[i].shelter == tileAtPos) {
								// already occupied
								this.takeOrder();
								return;
							}
						}
						// shelter in building
						this.pos = tileAtPos.pos.copy();
						this.shelter = tileAtPos;
						this.renderOrder = this.shelter.renderOrder + 1;
						
					}
					else if (tileAtPos instanceof Building_TownHall && this.intention == 'store') {
						
						GLOBAL.wood += this.wood;
						GLOBAL.stone += this.stone;
						GLOBAL.food += this.food;
						this.wood = 0;
						this.stone = 0;
						this.food = 0;
						this.intention = this.prevIntention;
						this.destination = this.prevDestination;
					}
					else {
						// TODO: go around?

						// walk thru for now at half speed
						this.pos = this.pos.add(vec2().setAngle(angle, this.speed / 4));
						this.mirror = movement.x < 0;
						this.walkFrame++;

						this.renderOrder = -this.pos.y;
					}
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
		else {
			this.walkFrame = 0;
		}

	}
		
	render() {

		// pre render

		// render
		super.render();

		// post render
		if (this.selected) {
			// select ring
			drawTile(
				this.pos,
				vec2(16 / 12),
				tile(1),
			);
		}
		
	}
}