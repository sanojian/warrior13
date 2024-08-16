

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

	const player = new EngineObject(vec2(2, 4), vec2(1), tile(1));

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
	
	if (mouseIsDown(0)) {
		console.log(mousePos)
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
