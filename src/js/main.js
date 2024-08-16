

function doEngineInit() {
	// startup LittleJS with your game functions after the tile image is loaded
	engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ["tiles.png"]);
}


function gameInit() {
	
	const w = 20;
	const h = 20;
	
	const tileLayer = new TileLayer(vec2(0), vec2(w, h));

	for (let y = 0; y < h; y++) {
		for (let x = 0; x < w; x++) {

			const info = new TileLayerData(0);

			tileLayer.setData(vec2(x, y), info);
		}
	}

	tileLayer.redraw();

	GLOBAL.units.push(
		new Unit_Worker(vec2(2, 4)),
		new Unit_Worker(vec2(2, 8)),
	);

	GLOBAL.townHall = new Building_TownHall(vec2(4, 4));

	GLOBAL.trees.push(
		new Tree(vec2(4, 6)),
		new Tree(vec2(5, 6)),
		new Tree(vec2(6, 6)),
		new Tree(vec2(5, 7)),
	);

	cameraPos = vec2(4, 4);
	cameraScale = 60;

}
function gameUpdate() {
	
	let itemSelected = false;

	if (mouseIsDown(0)) {


		if (GLOBAL.townHall.isOver(mousePos.x, mousePos.y)) {
			console.log('click');
			itemSelected = true;
		}
		else {

			const wereSelected = [];
			for (let i = 0; i < GLOBAL.units.length; i++) {
				const unit = GLOBAL.units[i];
				
				unit.selected && wereSelected.push(unit);

				unit.isOver(mousePos.x, mousePos.y);
				itemSelected = itemSelected || unit.selected;
					
			}

			if (!itemSelected) {
				// this was an order to selected units
				for (let i = 0; i < wereSelected.length; i++) {
					const unit = wereSelected[i];
					unit.selected = true;
					unit.destination = vec2(mousePos);
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
	
}

tileSizeDefault = vec2(12);
doEngineInit();
