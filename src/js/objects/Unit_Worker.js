
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
			this.drawTool(tile(vec2(24), 24));
		}
		else if (this.intention == 'mine') {
			// pick
			this.drawTool(tile(vec2(48, 24), 24));

		}
		else if (this.intention == 'build') {
			// hammer
			this.drawTool(tile(vec2(72, 24), 24));
		}
		else if (this.intention == 'farm') {
			// hoe
			this.drawTool(tile(vec2(48, 72), 24));
		}

	}

}