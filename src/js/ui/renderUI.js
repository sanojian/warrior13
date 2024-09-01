function gameRenderPost() {
	
	GLOBAL.vfxMan.render();
	
	if (GLOBAL.state == DEFS.STATES.GAME_LOST) {

		GLOBAL.uiFont.drawText(
			'You Have Lost\nClick to retry',
			screenToWorld(vec2(innerWidth / 2, innerHeight / 2)),
			0.12,
			true
		);

		return;
	}
	else if (GLOBAL.state == DEFS.STATES.GAME_WON) {

		cameraScale += GLOBAL.dScale;
		if (cameraScale > GLOBAL.maxCameraScale || cameraScale < GLOBAL.minCameraScale) {
			GLOBAL.dScale = -GLOBAL.dScale;
		}

		GLOBAL.uiFont.drawText(
			'You Have Defeated\nthe "heroes"!',
			screenToWorld(vec2(innerWidth / 2, innerHeight / 2)),
			0.12,
			true
		);

		return;
	}

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

	const dx = min(128, Math.round(128 * innerWidth / 800));

	// wood
	let uiPos = screenToWorld(vec2(dx, 64));

	drawUiBox(uiPos, tile(36), GLOBAL.wood);

	const manaPos = screenToWorld(vec2(innerWidth - dx, 64));;
	// mana
	drawUiBox(manaPos, tile(45), GLOBAL.mana);

	// stone
	uiPos = uiPos.subtract(vec2(0, 2));

	drawUiBox(uiPos, tile(44), GLOBAL.stone);
	

	// food
	uiPos = uiPos.subtract(vec2(0, 2));

	drawUiBox(uiPos, tile(37), GLOBAL.food);



	// population
	uiPos = uiPos.subtract(vec2(0, 2));

	drawUiBox(uiPos, tile(4), GLOBAL.units.length + '/' + GLOBAL.getSupportedPop());


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

	// invasion timer
	const countdown = Math.ceil(-GLOBAL.warriorTimer.valueOf());

	if (GLOBAL.warriorIndex < 12 && countdown < 31) {
		GLOBAL.uiFont.drawText(
			DEFS.WARRIORS[GLOBAL.warriorIndex].number + ' ' + countdown + '\n' + DEFS.WARRIORS[GLOBAL.warriorIndex].from,
			screenToWorld(vec2(innerWidth / 2, 24)),
			0.08,
			true
		);
	}
}

function drawUiBox(uiPos, tileInfo, text) {
	
	drawTile(
		uiPos,
		vec2(4, 2),
		tile(vec2(0, 48), vec2(48, 24))
	);
	drawTile(
		uiPos.subtract(vec2(0.8, 0)),
		vec2(1),
		tileInfo,
		new Color(1, 1, 1, 0.7)
	);

	GLOBAL.uiFont.drawText(
		text,
		uiPos.add(vec2(0.8, 0.2)),
		0.08,
		true
	);


}