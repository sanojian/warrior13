
class Unit_Worker extends PlayerUnit {

	constructor(pos) {

		super(pos, vec2(1), tile(4));

		this.selected = false;

		this.intention = undefined;
		this.intentionTarget = undefined;

	}


}