
class Button_Spell extends Button {

	constructor(x, y, tileInfo, mana, onClick) {

		super(x, y, tileInfo, onClick);

		this.requiresMana = mana;

	}

}