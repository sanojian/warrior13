

function doEngineInit() {
	// startup LittleJS with your game functions after the tile image is loaded
	engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ["tiles.png"]);
}


function gameInit() {
	

	fontDefault = 'monospace';
	GLOBAL.uiFont = new FontImage();

	GLOBAL.mapMan = new MapManager();

	// UI
	GLOBAL.buildMenu.push(
		new Button_Build(128, 96, 50, () => { GLOBAL.state = DEFS.STATES.BUILD_HOUSE; })
	);
	GLOBAL.townHallMenu.push(
		new Button_Upgrade(128, 96, 4, () => {
			GLOBAL.units.push(new Unit_Worker(vec2(4, 2)));
		})
	);

	cameraPos = vec2(4, 4);
	cameraScale = 60;

}
function gameUpdate() {

	if (GLOBAL.state == DEFS.STATES.BUILD_HOUSE) {
		
		if (mouseIsDown(0)) {
			clearInput();

			if (!GLOBAL.mapMan.getTileAt(mousePos)) {
				// legal position
				const x = Math.round(mousePos.x);
				const y = Math.round(mousePos.y);

				GLOBAL.buildings.push(new Building_House(vec2(x, y)));
				
			}
			
			GLOBAL.state = 0;
		}
	}
	else {
		GLOBAL.inputMan.update();
	}


}
function gameUpdatePost() {
	
}
function gameRender() {
	
}
function gameRenderPost() {
	
	if (GLOBAL.state == DEFS.STATES.BUILD_HOUSE) {
		// draw temp house

		const x = Math.round(mousePos.x);
		const y = Math.round(mousePos.y);

		let color = new Color(1, 1, 1, 0.5);
		if (GLOBAL.mapMan.getTileAt(mousePos)) {
			// illegal position 
			color = new Color(1, 0, 0, 0.5);
		}

		drawTile(
			vec2(x, y),
			vec2(1),
			tile(50),
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


}

tileSizeDefault = vec2(12);
doEngineInit();
