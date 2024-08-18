
class Button {

	constructor(x, y, iconTile) {
		this.x = x;
		this.y = y;
		this.iconTile = iconTile;
	}

	isOver(x, y) {

		const pos = screenToWorld(vec2(this.x, innerHeight - this.y));

		const clicked = x > pos.x - 1 && x < pos.x + 1 && y > pos.y - 1 && y < pos.y + 1;

		console.log(clicked)
		return clicked;
	}

	draw() {

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