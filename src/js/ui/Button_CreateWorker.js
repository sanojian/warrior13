
class Button_CreateWorker extends Button {

	constructor(x, y, tileInfo, onClick) {

		super(x, y, tileInfo, onClick);

		this.requiresPop = 1;

	}

	enoughMaterial() {

		// changes based on pop
		this.requiresFood = 5 * GLOBAL.units.length;
		
		return super.enoughMaterial();
	}

}