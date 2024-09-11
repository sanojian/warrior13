
GLOBAL.miniMap = {
	dx: 128,

	isOver(x, y) {

		const uiPos = screenToWorld(vec2(innerWidth - GLOBAL.miniMap.dx, innerHeight - GLOBAL.miniMap.dx));

		const dx = x - (uiPos.x - 18 / 12);
		const dy = y - (uiPos.y - 18 / 12);

		if (dx > 0 && dx <= 3 && dy > 0 && dy <= 3) {
			GLOBAL.desiredCameraPos = vec2(dx * 12, dy * 12);
			return true;
		}
	},

	draw(dx) {

		GLOBAL.miniMap.dx = dx;

		const uiPos = screenToWorld(vec2(innerWidth - dx, innerHeight - dx));

		drawTile(
			uiPos,
			vec2(3),
			tile(vec2(0, 144), vec2(36, 36))
		);
		drawRect(uiPos, vec2(28 / 12), new Color(.2, .6, .4));

		GLOBAL.miniMap.drawObjects(
			uiPos,
			[
				GLOBAL.trees,
				GLOBAL.stones,
				GLOBAL.buildings.concat(GLOBAL.units),
				GLOBAL.enemies
			],
			[
				new Color(.3, .4, .2),
				new Color(.61, .68, .72),
				new Color(.6, 1, .3),
				new Color(.9, .3, .4)
			]
		);
	},

	drawObjects(uiPos, arrays, colors) {

		for (let a = 0; a < arrays.length; a++) {
			const array = arrays[a];
			const color = colors[a];

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
}