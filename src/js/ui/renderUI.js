function gameRenderPost() {
	
	if (GLOBAL.state == DEFS.STATES.BUILD_HOUSE || GLOBAL.state == DEFS.STATES.BUILD_BARRACKS) {
		// draw temp house

		const x = Math.round(mousePos.x);
		const y = Math.round(mousePos.y);

		let color = new Color(1, 1, 1, 0.5);
		if (GLOBAL.mapMan.getTileAt(mousePos)) {
			// illegal position 
			color = new Color(1, 0, 0, 0.5);
		}

		let size = vec2(1);
		let tileInfo = tile(50);

		if (GLOBAL.state == DEFS.STATES.BUILD_BARRACKS) {
			size = vec2(2);
			tileInfo = tile(vec2(0, 96), vec2(24));
		}
		drawTile(
			vec2(x, y),
			size,
			tileInfo,
			color
		);

	}

	// wood
	let uiPos = screenToWorld(vec2(128, 64));

	drawTile(
		uiPos,
		vec2(4, 2),
		tile(vec2(0, 48), vec2(48, 24))
	);
	drawTile(
		uiPos.subtract(vec2(0.8, 0)),
		vec2(1),
		tile(36)
	);

	/*drawText(
		'' + GLOBAL.wood,
		uiPos.add(vec2(1.4, -0.1)),
		1,
		new Color(0, 0, 0),
		undefined,
		undefined,
		'right'
	);*/
	GLOBAL.uiFont.drawText(
		'' + GLOBAL.wood,
		uiPos.add(vec2(0.8, 0.2)),
		0.08,
		true
	);

	// stone
	uiPos = uiPos.add(vec2(4, 0));

	drawTile(
		uiPos,
		vec2(4, 2),
		tile(vec2(0, 48), vec2(48, 24))
	);
	drawTile(
		uiPos.subtract(vec2(0.8, 0)),
		vec2(1),
		tile(44)
	);

	GLOBAL.uiFont.drawText(
		'' + GLOBAL.stone,
		uiPos.add(vec2(0.8, 0.2)),
		0.08,
		true
	);

	// population
	uiPos = uiPos.add(vec2(4, 0));

	drawTile(
		uiPos,
		vec2(4, 2),
		tile(vec2(0, 48), vec2(48, 24))
	);
	drawTile(
		uiPos.subtract(vec2(1, 0)),
		vec2(1),
		tile(4),
		new Color(1, 1, 1, 0.7)
	);

	GLOBAL.uiFont.drawText(
		'' + GLOBAL.units.length + '/' + GLOBAL.getSupportedPop(),
		uiPos.add(vec2(0.6, 0.2)),
		0.08,
		true
	);

	// build menu
	if (GLOBAL.state == DEFS.STATES.BUILD_MENU) {
		for (let i = 0; i < GLOBAL.buildMenu.length; i++) {
			GLOBAL.buildMenu[i].draw();
		}

	}
	else if (GLOBAL.state == DEFS.STATES.TOWNHALL_MENU) {
		for (let i = 0; i < GLOBAL.townHallMenu.length; i++) {
			GLOBAL.townHallMenu[i].draw();
		}
	}

	// minimap
	GLOBAL.miniMap.draw();

}