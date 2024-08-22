
class Unit_Worker extends PlayerUnit {

	constructor(pos) {

		super(pos, vec2(1), tile(4));

		this.selected = false;

		this.intention = undefined;
		this.intentionTarget = undefined;

	}

	render() {

		super.render();

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