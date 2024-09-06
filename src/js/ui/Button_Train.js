
class Button_Train extends Button {

	constructor(x, y, tileInfo, weaponTile, onClick) {

		super(x, y, tileInfo, onClick);

		this.weaponTile = weaponTile;
		this.requiresWood = 4;
		this.requiresStone = 2;
		this.requiresWorker = 1;

	}

	draw() {

		super.draw();

		const color = new Color(1, 1, 1, this.enoughMaterial() ? 1 : .5);

		drawTile(
			screenToWorld(vec2(this.x, innerHeight - this.y)).add(vec2(0, -2/12)),
			vec2(2),
			this.weaponTile,
			color
		);

		// TODO: shield?
	}

}