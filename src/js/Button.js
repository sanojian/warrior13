
class Button {

	constructor(x, y, iconTile) {
		this.x = x;
		this.y = y;
		this.iconTile = iconTile;
	}

	isOver(x, y) {

		const clicked = x > this.pos.x - 1 && x < this.pos.x + 1 && y > this.pos.y - 1 && y < this.pos.y + 1;

		if (clicked) {
			GLOBAL.state = DEFS.STATES.BUILD_HOUSE;
		}
		return clicked;
	}

	draw() {

		this.pos = screenToWorld(vec2(this.x, innerHeight - this.y));

		drawTile(
			screenToWorld(vec2(this.x, innerHeight - this.y)),
			vec2(2),
			tile(vec2(0, 72), vec2(24, 24))
		);
		drawTile(
			screenToWorld(vec2(this.x, innerHeight - this.y)),
			vec2(1),
			tile(this.iconTile)
		);
			
	}
}