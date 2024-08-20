
class Button_Build extends Button {

	constructor(x, y, tileInfo, onClick) {

		super(x, y, tileInfo, onClick);

		this.requiresWood = 6;
		this.requiresStone = 4;

	}

}