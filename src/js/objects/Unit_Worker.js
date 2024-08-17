
class Unit_Worker extends EngineObject {

	constructor(pos) {

		super(pos, vec2(1), tile(4));

		this.selected = false;

		this.destination = pos;

		this.speed = 1 / 48;
		this.walkFrame = 0;
		this.walkTile = tile(5);

		this.intention = undefined;

		this.wood = 0;
		this.stone = 0;
	}

	isOver(x, y) {

		this.selected = x > this.pos.x - this.size.x / 2 && x < this.pos.x + this.size.x / 2 && y > this.pos.y - this.size.y / 2 && y < this.pos.y + this.size.y / 2;

		return this.selected;
	}

	chopTree(tree) {
		console.log('will chop')

		this.intention = 'chop';
	}

	update() {

		if (this.destination.x != this.pos.x || this.destination.y != this.pos.y) {
			
			const angle = this.destination.subtract(this.pos).angle();
			const dist = this.destination.distance(this.pos);

			if (dist < this.speed) {
				this.pos = this.destination;
			}
			else {
				const movement = vec2().setAngle(angle, this.speed);
				const newPos = this.pos.add(movement);
				const tileAtPos = GLOBAL.mapMan.getTileAt(newPos);

				if (tileAtPos) {
					// collision
					if (tileAtPos instanceof Tree) {
						const wood = tileAtPos.chop(1);
						this.wood += wood;
						console.log(this.wood)
					}
				}
				else {
					// walk towards destination
					this.pos = newPos;
					this.mirror = movement.x < 0;
					this.walkFrame++;
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
			this.pos,
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
				this.pos.add(vec2(this.mirror ? -4/12 : 4/12, 0)),
				vec2(1),
				tile(13),
				undefined,
				undefined,
				this.mirror
			);
		}

	}
}