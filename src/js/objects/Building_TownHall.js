
class Building_TownHall extends EngineObject {

	constructor(pos) {

		super(pos, vec2(2), tile(vec2(0, 24), 24));

		this.renderOrder = -pos.y;

		this.popSupport = 2;

		GLOBAL.mapGrid[pos.y][pos.x] = this;

	}

	isOver(x, y, selectedUnits) {

		const clicked = x > this.pos.x - this.size.x / 2 && x < this.pos.x + this.size.x / 2 && y > this.pos.y - this.size.y / 2 && y < this.pos.y + this.size.y / 2;
	
							
		for (let i = 0; i < selectedUnits.length; i++) {
			selectedUnits[i].takeOrder('store', this);
		}

		return clicked;
	}

}