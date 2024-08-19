

class Unit extends EngineObject {

	constructor(pos, size, tileInfo) {

		super(pos, size, tileInfo);

		this.destination = pos;

		this.speed = 1 / 48;
		this.walkFrame = 0;
		this.walkTile = tile(tileInfo.pos.add(vec2(12, 0), tileInfo.size));

		this.intention = undefined;
		this.intentionTarget = undefined;

		this.actionTimer = new Timer;
		this.actionFrame = 0;
		this.jumpHeight = 0;

	}

	render() {

		// pre render

		const step = Math.floor(this.walkFrame / 10) % 2;
		// render
		drawTile(
			this.pos.add(vec2(0, step ? 1 / 12 : this.jumpHeight)),
			vec2(1),
			step ? this.walkTile : this.tileInfo,
			undefined,
			undefined,
			this.mirror
		);
	}
}