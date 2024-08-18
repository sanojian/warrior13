
class Button {

	constructor(x, y, iconTile) {
		this.x = x;
		this.y = y;
		this.pos = vec2(x, y);
		this.iconTile = iconTile;

		this.requiresWood = 6;
		this.requiresStone = 4;

	}

	isOver(x, y) {

		if (!this.enoughMaterial()) {
			return;
		}

		const clicked = x > this.pos.x - 1 && x < this.pos.x + 1 && y > this.pos.y - 1 && y < this.pos.y + 1;

		if (clicked) {
			GLOBAL.state = DEFS.STATES.BUILD_HOUSE;
		}
		return clicked;
	}

	enoughMaterial() {
		return GLOBAL.stone >= this.requiresStone && GLOBAL.wood >= this.requiresWood;
	}

	draw() {

		const color = new Color(1, 1, 1, this.enoughMaterial() ? 1 : 0.5);

		this.pos = screenToWorld(vec2(this.x, innerHeight - this.y));

		drawTile(
			screenToWorld(vec2(this.x, innerHeight - this.y)),
			vec2(2),
			tile(vec2(0, 72), vec2(24, 24)),
			color
		);
		drawTile(
			screenToWorld(vec2(this.x, innerHeight - this.y)),
			vec2(1),
			tile(this.needsBuilt ? 58 : this.iconTile),
			color
		);
			
	}
}