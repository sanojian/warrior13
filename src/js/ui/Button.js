
class Button {

	constructor(x, y, tileInfo, onClick) {
		this.x = x;
		this.y = y;
		this.pos = vec2(x, y);
		this.tileInfo = tileInfo;

		this.requiresWood = 0;
		this.requiresStone = 0;
		this.requiresFood = 0;
		this.requiresWorker = 0;
		this.requiresMana = 0;
		this.requiresPop = 0;

		this.clicked = onClick;
	}

	isOver(x, y) {

		const isOver = x > this.pos.x - 1 && x < this.pos.x + 1 && y > this.pos.y - 1 && y < this.pos.y + 1;
		
		if (isOver && !this.enoughMaterial()) {
			// tell user what they need
			GLOBAL.showMessage('NEED\n'
				+ (this.requiresWood ? this.requiresWood + ' WOOD\n' : '')
				+ (this.requiresStone ? this.requiresStone + ' STONE\n' : '')
				+ (this.requiresFood ? this.requiresFood + ' FOOD\n' : '')
				+ (this.requiresWorker ? this.requiresWorker + ' WORKER\n' : '')
				+ (this.requiresMana ? this.requiresMana + ' MANA\n' : '')
				+ (this.requiresPop ? this.requiresPop + ' LIVING SPACE' : ''));
			return isOver;
		}

		isOver && this.clicked();

		return isOver;
	}

	enoughMaterial() {
		return GLOBAL.wood >= this.requiresWood
			&& GLOBAL.stone >= this.requiresStone
			&& GLOBAL.food >= this.requiresFood
			&& GLOBAL.mana >= this.requiresMana
			&& GLOBAL.countWorkers() >= this.requiresWorker
			&& GLOBAL.getSupportedPop() - GLOBAL.units.length >= this.requiresPop;
	}


	draw() {

		const color = new Color(1, 1, 1, this.enoughMaterial() ? 1 : 0.5);

		this.pos = screenToWorld(vec2(this.x, innerHeight - this.y));

		drawTile(
			screenToWorld(vec2(this.x, innerHeight - this.y)),
			vec2(2),
			tile(vec2(0, 72), vec2(24, 24)),
			color
		);
		drawTile(
			screenToWorld(vec2(this.x, innerHeight - this.y)),
			vec2(this.tileInfo.size.x / 12, this.tileInfo.size.y / 12),
			this.tileInfo,
			color
		);
			
	}
}