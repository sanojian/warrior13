
class Unit_Worker extends EngineObject {

	constructor(pos) {

		super(pos, vec2(1), tile(1));

		this.selected = false;

		this.destination = pos;

		this.speed = 1 / 48;
	}

	isOver(x, y) {

		this.selected = x > this.pos.x - this.size.x / 2 && x < this.pos.x + this.size.x / 2 && y > this.pos.y - this.size.y / 2 && y < this.pos.y + this.size.y / 2;

		return this.selected;
	}

	update() {

		if (this.destination.x != this.pos.x || this.destination.y != this.pos.y) {
			
			const angle = this.destination.subtract(this.pos).angle();
			const dist = this.destination.distance(this.pos);
			console.log(angle)

			if (dist < this.speed) {
				this.pos = this.destination;
			}
			else {
				this.pos = this.pos.add(vec2().setAngle(angle, this.speed));
			}

		}

	}
		
	render() {

		// pre render

		// render
		drawTile(
			this.pos,
			vec2(1),
			this.tileInfo
		);

		// post render
		if (this.selected) {
			drawTile(
				this.pos,
				vec2(16 / 12),
				tile(3)
			);
		}
	}
}