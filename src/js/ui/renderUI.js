function gameRenderPost() {
	
	GLOBAL.vfxMan.render();
	
	if (GLOBAL.state == DEFS.STATES.BUILD_HOUSE
		|| GLOBAL.state == DEFS.STATES.BUILD_BARRACKS
		|| GLOBAL.state == DEFS.STATES.BUILD_FARM
		|| GLOBAL.state == DEFS.STATES.BUILD_WALL
	) {
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
		else if (GLOBAL.state == DEFS.STATES.BUILD_WALL) {
			tileInfo = tile(51);
		}
		else if (GLOBAL.state == DEFS.STATES.BUILD_FARM) {
			size = vec2(2);
			tileInfo = tile(vec2(24, 96), vec2(24));
		}
		// placing the building
		drawTile(
			vec2(x, y),
			size,
			tileInfo,
			color
		);

	}

	const dx = Math.min(128, Math.round(128 * innerWidth / 800));

	// wood
	let uiPos = screenToWorld(vec2(dx, 64));

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

	GLOBAL.uiFont.drawText(
		'' + GLOBAL.wood,
		uiPos.add(vec2(0.8, 0.2)),
		0.08,
		true
	);

	const manaPos = screenToWorld(vec2(innerWidth - dx, 64));;
	// mana
	drawTile(
		manaPos,
		vec2(4, 2),
		tile(vec2(0, 48), vec2(48, 24))
	);
	drawTile(
		manaPos.subtract(vec2(0.8, 0)),
		vec2(1),
		tile(45),
		new Color(1, 1, 1, 0.7)
	);

	GLOBAL.uiFont.drawText(
		'' + GLOBAL.mana,
		manaPos.add(vec2(0.8, 0.2)),
		0.08,
		true
	);

	// stone
	uiPos = uiPos.subtract(vec2(0, 2));

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

	// food
	uiPos = uiPos.subtract(vec2(0, 2));

	drawTile(
		uiPos,
		vec2(4, 2),
		tile(vec2(0, 48), vec2(48, 24))
	);
	drawTile(
		uiPos.subtract(vec2(0.8, 0)),
		vec2(1),
		tile(37),
		new Color(1, 1, 1, 0.7)
	);

	GLOBAL.uiFont.drawText(
		'' + GLOBAL.food,
		uiPos.add(vec2(0.8, 0.2)),
		0.08,
		true
	);


	// population
	uiPos = uiPos.subtract(vec2(0, 2));

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

	//  ui menus
	if (GLOBAL.state == DEFS.STATES.BUILD_MENU) {
		for (let i = 0; i < GLOBAL.buildMenu.length; i++) {
			GLOBAL.buildMenu[i].draw();
		}
	}
	if (GLOBAL.state == DEFS.STATES.TRAIN_MENU) {
		for (let i = 0; i < GLOBAL.trainMenu.length; i++) {
			GLOBAL.trainMenu[i].draw();
		}
	}
	else if (GLOBAL.state == DEFS.STATES.TOWNHALL_MENU) {
		for (let i = 0; i < GLOBAL.townHallMenu.length; i++) {
			GLOBAL.townHallMenu[i].draw();
		}
	}

	for (let i = 0; i < GLOBAL.spellMenu.length; i++) {
		GLOBAL.spellMenu[i].draw();
	}

	// minimap
	GLOBAL.miniMap.draw(dx);

	// messages
	if (GLOBAL.message) {
		if (GLOBAL.messageTimer.elapsed()) {
			GLOBAL.message = '';
		}

		// display message
		GLOBAL.uiFont.drawText(
			GLOBAL.message,
			cameraPos,
			0.08,
			true
		);

	}

}