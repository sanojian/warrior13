
class Building_Temple extends Building {

	constructor(pos) {

		super(pos, vec2(2), tile(vec2(48, 96), vec2(24)));

		this.hitPoints = 18;
		this.maxHitPoints = 18;
		
		this.build(10);
	}

	handleClick(selectedUnits) {

		if (super.handleClick(selectedUnits)) 
			return;
		
		!selectedUnits.length && GLOBAL.showMessage('HOLY SHRINE');

		for (let u = 0; u < selectedUnits.length; u++) 
			selectedUnits[u].takeOrder('pray', this);
		


		return true;
	}


}