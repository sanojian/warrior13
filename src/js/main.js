

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
			for (let i = 0; i < GLOBAL.units.length; i++) {
				const unit = GLOBAL.units[i];
				if (unit.selected) {
					GLOBAL.units.splice(GLOBAL.units.indexOf(unit), 1);
					const newUnit = new Unit_Soldier(unit.pos);
					newUnit.shelter = unit.shelter;
					GLOBAL.units.push(newUnit);
					unit.destroy();
					GLOBAL.state = 0;
				}
			}
		}),
	);
	GLOBAL.buildMenu.push(
		new Button_Build(128, 96, tile(50), 6, 4, 0, () => {
			GLOBAL.state = DEFS.STATES.BUILD_HOUSE;
		}),
		new Button_Build(256, 96, tile(vec2(24, 96), vec2(24)), 6, 4, 0, () => {
			GLOBAL.state = DEFS.STATES.BUILD_FARM;
		}),
		new Button_Build(384, 96, tile(51), 2, 1, 0, () => {
			GLOBAL.state = DEFS.STATES.BUILD_WALL;
		}),
		new Button_Build(512, 96, tile(vec2(0, 96), vec2(24)), 6, 10, 0, () => {
			GLOBAL.state = DEFS.STATES.BUILD_BARRACKS;
		}),
	);
	GLOBAL.townHallMenu.push(
		new Button_CreateWorker(128, 96, tile(4), () => {
			GLOBAL.food -= 5 * GLOBAL.units.length;
			GLOBAL.units.push(new Unit_Worker(DEFS.HOME.add(vec2(- 1 + Math.random() * 2, - 1))));
		})
	);
	GLOBAL.spellMenu.push(
		new Button_Spell(innerWidth - 128, innerHeight - 96, tile(120), 10, () => {
			for (let i = 0; i < GLOBAL.enemies.length; i++) {
				GLOBAL.enemies[i].takeDamage(1);
			}
			zzfx(...[2.8,,48,,.23,.73,4,1.9,,-4,,,.21,.2,,.5,.41,.36,.07,.29]);
		})
	);

	cameraPos = DEFS.HOME;
	cameraScale = Math.min(60, 60 * innerWidth / 900);

	GLOBAL.warriorIndex = 0;
	GLOBAL.warriorTimer = new Timer(120);

}
function gameUpdate() {

	if (GLOBAL.state == DEFS.STATES.BUILD_HOUSE || GLOBAL.state == DEFS.STATES.BUILD_BARRACKS  || GLOBAL.state == DEFS.STATES.BUILD_FARM || GLOBAL.state == DEFS.STATES.BUILD_WALL) {
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
				else if (GLOBAL.state == DEFS.STATES.BUILD_FARM) {
					GLOBAL.buildings.push(new Building_Farm(vec2(x, y)));
				}
				else if (GLOBAL.state == DEFS.STATES.BUILD_WALL) {
					GLOBAL.buildings.push(new Building_Wall(vec2(x, y)));
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

		const def = DEFS.WARRIORS[GLOBAL.warriorIndex];

		GLOBAL.speak('The' + def.number + ' warrior, ' + def.name + ' approaches', 2, 1, 1);
		GLOBAL.showMessage(def.name + ' approaches');
		
		// spawn enemies
		for (let i = 0; i < def.enemies.length; i += 2) {

			let tileInfo = tile(94 + Math.floor(Math.random() * 4) * 8);
			let size = vec2(1);

			if (i == 0) {
				// hero
				tileInfo = tile(def.heroTile || 6);
				size = vec2(def.heroSize || 1.2);
			}
			let enemy = new Unit_Enemy(vec2(def.enemies[i], def.enemies[i+1]), size, tileInfo);
			enemy.destination = DEFS.HOME;
			GLOBAL.enemies.push(enemy);

		}

		// place boat
		const x = def.enemies[0];
		const y = def.enemies[1];
		GLOBAL.boat.pos = vec2(x > 20 ? 33 : x < 5 ? 2 : 18, y > 20 ? 33 : y < 5 ? 2 : 18);

		
		if (GLOBAL.warriorIndex < 12) {
			GLOBAL.warriorTimer.set(90);
			GLOBAL.warriorIndex++;
		}
		else {
			GLOBAL.warriorTimer.unset();
		}
	}

}

function gameUpdatePost() {
	
	// occasionally push units apart
	separateUnits(GLOBAL.units);
	separateUnits(GLOBAL.enemies);

}

function gameRender() {
	
}

function separateUnits(unitArray) {

	if (unitArray.length > 1) {
		const index = frame % unitArray.length;
		const unit1 = unitArray[index];
		
		for (let i = 0; i < unitArray.length; i++) {
			if (i == index) {
				continue;
			}
			const unit2 = unitArray[i];
			const dist = unit2.pos.subtract(unit1.pos).length();
			if (dist < 0.8) {
				const angle = unit2.pos.subtract(unit1.pos).angle();
				if (!unit1.shelter) {
					unit1.pos.x += Math.random() * 0.01 * Math.cos(angle);
					unit1.pos.y += Math.random() * 0.01 * Math.sin(angle);
				}
				if (!unit2.shelter) {
					unit2.pos.x += Math.random() * 0.01 * Math.cos(angle + PI);
					unit2.pos.y += Math.random() * 0.01 * Math.sin(angle + PI);
				}
				
			}
		}
	}

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
