
class Unit_Worker extends PlayerUnit {

	constructor(pos) {

		super(pos, vec2(1), tile(4));

	}

	render() {

		super.render();

		let tilePos;
		if (this.intention == 'chop') 
			tilePos = vec2(24);
		if (this.intention == 'mine') 
			tilePos = vec2(48, 24);
		if (this.intention == 'build') 
			tilePos = vec2(72, 24);
		if (this.intention == 'farm') 
			tilePos = vec2(48, 72);

		tilePos && this.drawTool(tilePos);

	}

}