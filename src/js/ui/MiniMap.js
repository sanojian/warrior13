
GLOBAL.miniMap = {
	dx: 128,

	isOver(x, y) {

		const uiPos = screenToWorld(vec2(innerWidth - GLOBAL.miniMap.dx, innerHeight - GLOBAL.miniMap.dx));

		const dx = x - (uiPos.x - 18 / 12);
		const dy = y - (uiPos.y - 18 / 12);

		if (dx > 0 && dx <= 3 && dy > 0 && dy <= 3) {
			cameraPos = vec2(dx * 12, dy * 12);		
		}
	},

	draw(dx) {

		GLOBAL.miniMap.dx = dx;

		const uiPos = screenToWorld(vec2(innerWidth - dx, innerHeight - dx));

		drawTile(
			uiPos,
			vec2(3),
			tile(vec2(36, 144), vec2(36, 36))
		);

		let color = new Color(75 / 255, 105 / 255, 47 / 255);
		GLOBAL.miniMap.drawObjects(uiPos, GLOBAL.trees, color);

		color = new Color(155 / 255, 173 / 255, 183 / 255);
		GLOBAL.miniMap.drawObjects(uiPos, GLOBAL.stones, color);

		color = new Color(153 / 255, 229 / 255, 80 / 255);
		GLOBAL.miniMap.drawObjects(uiPos, GLOBAL.buildings, color);
		GLOBAL.miniMap.drawObjects(uiPos, GLOBAL.units, color);

		color = new Color(217 / 255, 87 / 255, 99 / 255);
		GLOBAL.miniMap.drawObjects(uiPos, GLOBAL.enemies, color);
	},

	drawObjects(uiPos, array, color) {

		for (let i = 0; i < array.length; i++) {
			const obj = array[i];
			drawRect(
				uiPos.add(vec2((obj.pos.x - 18) / 12, (obj.pos.y - 18) / 12)),
				vec2((obj instanceof Building_TownHall ? 2 : 1) / 12),
				color
			);
		}
	}
}