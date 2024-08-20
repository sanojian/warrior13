

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
		new Button_Build(128, 96, tile(50), () => { GLOBAL.state = DEFS.STATES.BUILD_HOUSE; }),
		new Button_Build(256, 96, tile(vec2(0, 96), vec2(24)), () => { GLOBAL.state = DEFS.STATES.BUILD_BARRACKS; }),
	);
	GLOBAL.townHallMenu.push(
		new Button_Upgrade(128, 96, tile(4), () => {
			const pos = GLOBAL.buildings[0].pos;

			GLOBAL.units.push(new Unit_Worker(vec2(pos.x - 1 + Math.random() * 2, pos.y - 1)));
		})
	);

	cameraPos = GLOBAL.buildings[0].pos;
	cameraScale = 60;

}
function gameUpdate() {

	if (GLOBAL.state == DEFS.STATES.BUILD_HOUSE || GLOBAL.state == DEFS.STATES.BUILD_BARRACKS) {
		
		if (mouseIsDown(0)) {
			clearInput();

			if (!GLOBAL.mapMan.getTileAt(mousePos)) {
				// legal position
				const x = Math.round(mousePos.x);
				const y = Math.round(mousePos.y);

				if (GLOBAL.state == DEFS.STATES.BUILD_BARRACKS) {
					GLOBAL.buildings.push(new Building_Barracks(vec2(x, y)));
				}
				else {
					GLOBAL.buildings.push(new Building_House(vec2(x, y)));
				}
				
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


tileSizeDefault = vec2(12);
doEngineInit();

