
class Button_CreateWorker extends Button {

	constructor(x, y, tileInfo, onClick) {

		super(x, y, tileInfo, onClick);

		this.requiresPop = 1;
		this.requiresFood = 10;

	}


}