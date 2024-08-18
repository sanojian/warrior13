
class Unit_Worker extends EngineObject {

	constructor(pos) {

		super(pos, vec2(1), tile(4));

		this.selected = false;

		this.destination = pos;

		this.speed = 1 / 48;
		this.walkFrame = 0;
		this.walkTile = tile(5);

		this.intention = undefined;
		this.intentionTarget = undefined;

		this.wood = 0;
		this.stone = 0;

		this.actionTimer = new Timer;
		this.actionFrame = 0;
		this.jumpHeight = 0;
	}

	isOver(x, y) {

		this.selected = x > this.pos.x - this.size.x / 2 && x < this.pos.x + this.size.x / 2 && y > this.pos.y - this.size.y / 2 && y < this.pos.y + this.size.y / 2;

		/*if (this.selected) {
			const T2S = window.speechSynthesis || speechSynthesis; // Storing speechSynthesis API as variable - T2S
		    var utter = new SpeechSynthesisUtterance('Ready for work'); // To Make The Utterance
    		T2S.speak(utter); // To Speak The Utterance
		}*/

		return this.selected;
	}

	takeOrder(order, target) {

		this.intention = order;
		this.destination = target.pos;
		this.actionFrame = 0;
	}

	update() {

		if (this.actionTimer.isSet()) {
			// performing action

			if (this.actionTimer.elapsed()) {
				this.actionTimer.unset();
				this.jumpHeight = 0;
				if (this.intention == 'chop') {
					// TODO: check if tree still exists
					const wood = this.intentionTarget.chop(1);
					wood && zzfx(...[,.03,405,,,0,3,.1,8,,,,,.1,27,.4,.04,.44,.01]); 
					this.wood += wood;
				}
				else if (this.intention == 'mine') {
					// TODO: check if stone still exists
					const stone = this.intentionTarget.mine(1);
					stone && zzfx(...[.5,0,1793,,.05,.02,3,.7,,-1,,,,.1,,,,.63,.02,,-1400]);
					this.stone += stone;
				}
				else if (this.intention == 'build') {
					// TODO: check if building still exists
					this.intentionTarget.build(1);
					zzfx(...[,.03,405,,,0,3,.1,8,,,,,.1,27,.4,.04,.44,.01]);
				}

				if (this.wood + this.stone >= 3) {
					// return to storage
					this.prevIntention = this.intention;
					this.prevDestination = this.destination;
					this.intention = 'store';
					this.destination = GLOBAL.buildings[0].pos;
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
				this.pos = this.destination;
				if (this.intention == 'chop') {
					// look for new target
					let closest = Infinity;
					let target = undefined;
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
				const movement = vec2().setAngle(angle, this.speed);
				const newPos = this.pos.add(movement);
				const tileAtPos = GLOBAL.mapMan.getTileAt(newPos);

				if (tileAtPos) {
					// collision
					if (tileAtPos instanceof Tree && this.intention == 'chop') {
						
						this.actionTimer.set(1);
						this.actionFrame = 0;
						this.intentionTarget = tileAtPos;
					}
					else if (tileAtPos instanceof Stone && this.intention == 'mine') {
						
						this.actionTimer.set(1);
						this.actionFrame = 0;
						this.intentionTarget = tileAtPos;
					}
					else if (tileAtPos instanceof Building_House && this.intention == 'build' && tileAtPos.needsBuilt) {
						
						this.actionTimer.set(1);
						this.actionFrame = 0;
						this.intentionTarget = tileAtPos;
					}
					else if (tileAtPos instanceof Building_TownHall && this.intention == 'store') {
						
						GLOBAL.wood += this.wood;
						GLOBAL.stone += this.stone;
						this.wood = 0;
						this.stone = 0;
						this.intention = this.prevIntention;
						this.destination = this.prevDestination;
					}
					else {
						// TODO: go around?
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
		drawTile(
			this.pos.add(vec2(0, this.jumpHeight)),
			vec2(1),
			Math.floor(this.walkFrame / 10) % 2 ? this.walkTile : this.tileInfo,
			undefined,
			undefined,
			this.mirror
		);

		// post render
		if (this.selected) {
			// select ring
			drawTile(
				this.pos,
				vec2(16 / 12),
				tile(3),
			);
		}

		if (this.intention == 'chop') {
			// axe
			drawTile(
				this.pos.add(vec2(0, -2/12)),
				vec2(2),
				tile(vec2(24), 24),
				undefined,
				(this.mirror ? 1 : -1) * this.actionFrame / (PI*12),
				this.mirror
			);
		}
		else if (this.intention == 'mine') {
			// axe
			drawTile(
				this.pos.add(vec2(0, -2/12)),
				vec2(2),
				tile(vec2(48, 24), 24),
				undefined,
				(this.mirror ? 1 : -1) * this.actionFrame / (PI*12),
				this.mirror
			);
		}
		else if (this.intention == 'build') {
			// axe
			drawTile(
				this.pos.add(vec2(0, -2/12)),
				vec2(2),
				tile(vec2(72, 24), 24),
				undefined,
				(this.mirror ? 1 : -1) * this.actionFrame / (PI*12),
				this.mirror
			);
		}

	}
}