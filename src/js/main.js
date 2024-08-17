

function doEngineInit() {
	// startup LittleJS with your game functions after the tile image is loaded
	engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ["tiles.png"]);
}


function gameInit() {
	

	GLOBAL.mapMan = new MapManager();

	cameraPos = vec2(4, 4);
	cameraScale = 60;

}
function gameUpdate() {
	
	let itemSelected = false;
	let orderGiven = false;

	// TODO: turn into single click
	if (mouseIsDown(0)) {


		const wereSelected = [];
		for (let i = 0; i < GLOBAL.units.length; i++) {
			const unit = GLOBAL.units[i];
			
			unit.selected && wereSelected.push(unit);

			unit.isOver(mousePos.x, mousePos.y);
			itemSelected = itemSelected || unit.selected;
				
		}
		for (let i = 0; i < GLOBAL.trees.length && !itemSelected; i++) {
			const tree = GLOBAL.trees[i];
			
			if (tree.isOver(mousePos.x, mousePos.y)) {
			
				for (let u = 0; u < wereSelected.length; u++) {
					wereSelected[u].takeOrder('chop', tree);
					orderGiven = true;
				}
			}
				
		}
		for (let i = 0; i < GLOBAL.stones.length && !itemSelected; i++) {
			const stone = GLOBAL.stones[i];
			
			if (stone.isOver(mousePos.x, mousePos.y)) {
			
				for (let u = 0; u < wereSelected.length; u++) {
					wereSelected[u].takeOrder('mine', stone);
					orderGiven = true;
				}
			}
				
		}

		for (let i = 0; i < GLOBAL.buildings.length && !itemSelected; i++) {
			const building = GLOBAL.buildings[i];

			if (building.isOver(mousePos.x, mousePos.y)) {

				for (let u = 0; u < wereSelected.length; u++) {
					wereSelected[u].takeOrder('store', building);
					orderGiven = true;
				}
			}
		}

		if (!itemSelected || orderGiven) {
			// this was an order to selected units
			for (let i = 0; i < wereSelected.length; i++) {
				const unit = wereSelected[i];
				unit.selected = true;

				// move command
				unit.destination = vec2(mousePos);
				if (!orderGiven) {
					unit.intention = undefined;
				}
			}
		}
	}

}
function gameUpdatePost() {
	
}
function gameRender() {
	
}
function gameRenderPost() {
	
	let uiPos = screenToWorld(vec2(128, 64));

	drawTile(
		uiPos,
		vec2(4, 2),
		tile(vec2(0, 48), vec2(48, 24))
	);

	drawText(
		'' + GLOBAL.wood,
		uiPos.add(vec2(1.4, -0.1)),
		1,
		new Color(0, 0, 0),
		undefined,
		undefined,
		'right'
	);

	uiPos = uiPos.add(vec2(4, 0));

	drawTile(
		uiPos,
		vec2(4, 2),
		tile(vec2(48, 48), vec2(48, 24))
	);

	drawText(
		'' + GLOBAL.stone,
		uiPos.add(vec2(1.4, -0.1)),
		1,
		new Color(0, 0, 0),
		undefined,
		undefined,
		'right'
	);


}

tileSizeDefault = vec2(12);
doEngineInit();
