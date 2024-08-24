
class Button_Build extends Button {

	constructor(x, y, tileInfo, wood, stone, food, onClick) {

		super(x, y, tileInfo, onClick);

		this.requiresWood = wood;
		this.requiresStone = stone;

	}

}