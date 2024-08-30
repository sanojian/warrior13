
GLOBAL.miniMap = {

	isOver(x, y) {

		const uiPos = screenToWorld(vec2(innerWidth - 128, innerHeight - 128));

		const dx = x - (uiPos.x - 18 / 12);
		const dy = y - (uiPos.y - 18 / 12);

		if (dx > 0 && dx <= 3 && dy > 0 && dy <= 3) {
			cameraPos = vec2(dx * 12, dy * 12);		
		}
	},

	draw(dx) {
		const uiPos = screenToWorld(vec2(innerWidth - dx, innerHeight - dx));

		drawTile(
			uiPos,
			vec2(3),
			tile(vec2(36, 144), vec2(36, 36))
		);
		for (let y = 0; y < GLOBAL.mapMan.mapHeight; y++) {
			for (let x = 0; x < GLOBAL.mapMan.mapWidth; x++) {
				const val = GLOBAL.mapGrid[y][x];
				if (val) {
					let color = new Color(75 / 255, 105 / 255, 47 / 255); // tree
					let size = vec2(1 / 12);
					if (val instanceof Stone) {
						color = new Color(155 / 255, 173 / 255, 183 / 255)
					}

					if (typeof(val) !== 'string') {
						drawRect(
							uiPos.add(vec2((x - 18) / 12, (y - 18) / 12)),
							size,
							color
						);
					}
				}
			}
		}
		let color = new Color(153 / 255, 229 / 255, 80 / 255);
		for (let i = 0; i < GLOBAL.buildings.length; i++) {
			const building = GLOBAL.buildings[i];
			drawRect(
				uiPos.add(vec2((building.pos.x - 18) / 12, (building.pos.y - 18) / 12)),
				building instanceof Building_TownHall ? vec2(2/12) : vec2(1/12),
				color
			);
		}
		for (let i = 0; i < GLOBAL.units.length; i++) {
			const unit = GLOBAL.units[i];
			drawRect(
				uiPos.add(vec2((unit.pos.x - 18) / 12, (unit.pos.y - 18) / 12)),
				vec2(1/12),
				color
			);
		}

		color = new Color(217 / 255, 87 / 255, 99 / 255);
		for (let i = 0; i < GLOBAL.enemies.length; i++) {
			const enemy = GLOBAL.enemies[i];
			drawRect(
				uiPos.add(vec2((enemy.pos.x - 18) / 12, (enemy.pos.y - 18) / 12)),
				vec2(1/12),
				color
			);
		}

	}
}