

function doEngineInit() {
	// startup LittleJS with your game functions after the tile image is loaded
	engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ["tiles.png"]);
}


function gameInit() {
	

	GLOBAL.uiFont = new FontImage();

	GLOBAL.mapMan = new MapManager();

	// UI
	GLOBAL.trainMenu.push(
		new Button_Train(128, 96, tile(12), tile(vec2(72, 72), 24), () => {
			for (let i = 0; i < GLOBAL.units.length; i++) {
				const unit = GLOBAL.units[i];
				if (unit.selected) {
					GLOBAL.units.splice(GLOBAL.units.indexOf(unit), 1);
					const newUnit = new Unit_Archer(unit.pos);
					newUnit.shelter = unit.shelter;
					GLOBAL.units.push(newUnit);
					unit.destroy();
					GLOBAL.state = 0;
				}
			}
		}),
		new Button_Train(256, 96, tile(14), tile(vec2(72, 96), 24), () => {
			GLOBAL.state = DEFS.STATES.BUILD_HOUSE;
		}),
	);
	GLOBAL.buildMenu.push(
		new Button_Build(128, 96, tile(50), () => { GLOBAL.state = DEFS.STATES.BUILD_HOUSE; }),
		new Button_Build(256, 96, tile(vec2(0, 96), vec2(24)), () => { GLOBAL.state = DEFS.STATES.BUILD_BARRACKS; }),
	);
	GLOBAL.townHallMenu.push(
		new Button_Upgrade(128, 96, tile(4), () => {
			const pos = GLOBAL.buildings[0].pos;

			const unit = new Unit_Worker(vec2(pos.x - 1 + Math.random() * 2, pos.y - 1));
			unit.selected = true;
			GLOBAL.units.push(unit);
		})
	);

	cameraPos = GLOBAL.buildings[0].pos;
	cameraScale = 60;

	GLOBAL.warriorIndex = 0;
	GLOBAL.warriorTimer = new Timer(5);

}
function gameUpdate() {

	if (GLOBAL.state == DEFS.STATES.BUILD_HOUSE || GLOBAL.state == DEFS.STATES.BUILD_BARRACKS) {
		// building

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

	GLOBAL.vfxMan.update();

	if (GLOBAL.warriorTimer.isSet() && GLOBAL.warriorTimer.elapsed()) {

		GLOBAL.speak(DEFS.WARRIORS[Math.min(DEFS.WARRIORS.length - 1, GLOBAL.warriorIndex)].announcement, 2, 1, 1);
		GLOBAL.warriorTimer.set(30);
		GLOBAL.warriorIndex++;
	}

}

function gameUpdatePost() {
	
}

function gameRender() {
	
}

function loadMapData(callback) {

		const img = new Image(); 
		img.onload = function() {
			const canvas = document.createElement("canvas");
			canvas.height = img.height;
			const body = document.getElementsByTagName("body")[0];
			body.appendChild(canvas);
			const ctx = canvas.getContext("2d");

			ctx.drawImage(img, 0, 0);

			const data = ctx.getImageData(0, 144, 36, 36).data;

			// create map grid from image data
			GLOBAL.mapGrid = [];
			for (let y = 0; y < 36; y++) {
				GLOBAL.mapGrid[35 - y] = [];
				for (let x = 0; x < 36; x++) {
					const index = 4 * (y * 36 + x);
					let val = 0;
					if (data[index] == 91 && data[index + 1] == 110 && data[index + 2] == 225) {
						val = 'w';
					}
					else if (data[index] == 75 && data[index + 1] == 105 && data[index + 2] == 47) {
						val = 't';
					}
					else if (data[index] == 155 && data[index + 1] == 173 && data[index + 2] == 183) {
						val = 's';
					}

					GLOBAL.mapGrid[35 - y][x] = val;
				}
			}

			body.removeChild(canvas);

			callback();
		}
		img.src = "tiles.png";
}
	

tileSizeDefault = vec2(12);


// wait for voices to load 
speechSynthesis.onvoiceschanged = function() {
	GLOBAL.voices = speechSynthesis.getVoices();

	GLOBAL.voicesLoaded = true;
};

loadMapData(doEngineInit);
