

function doEngineInit() {
	// startup LittleJS with your game functions after the tile image is loaded
	engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ["t.png"]);
}


function gameInit() {
	

	GLOBAL.uiFont = new FontImage(GLOBAL.fontImage);

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
		new Button_Train(256, 96, tile(14), tile(vec2(0, 24), 24), () => {
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
	const dx = min(128, Math.round(128 * innerWidth / 800));

	GLOBAL.buildMenu.push(
		new Button_Build(dx, 96, tile(50), 6, 4, 0, () => {
			GLOBAL.showMessage('HOUSE IS LIVING SPACE');
			GLOBAL.state = DEFS.STATES.BUILD_HOUSE;
		}),
		new Button_Build(dx*2, 96, tile(vec2(24, 96), vec2(24)), 6, 4, 0, () => {
			GLOBAL.showMessage('FARM IS FOR FOOD');
			GLOBAL.state = DEFS.STATES.BUILD_FARM;
		}),
		new Button_Build(dx*3, 96, tile(51), 2, 1, 0, () => {
			GLOBAL.showMessage('WALL IS FOR PROTECTION');
			GLOBAL.state = DEFS.STATES.BUILD_WALL;
		}),
		new Button_Build(dx*4, 96, tile(vec2(0, 96), vec2(24)), 6, 10, 0, () => {
			//GLOBAL.showMessage('the quick brown\nfox! jumps over\nthe lazy dog?');
			GLOBAL.showMessage('PUT WORKERS INTO\nBARRACKS TO TRAIN');
			GLOBAL.state = DEFS.STATES.BUILD_BARRACKS;
		}),
	);
	GLOBAL.townHallMenu.push(
		new Button_CreateWorker(128, 96, tile(4), () => {
			GLOBAL.food -= 5 * GLOBAL.units.length;
			GLOBAL.units.push(new PlayerUnit(DEFS.HOME.add(vec2(rand(-1, 1), - 1))));
			GLOBAL.speak(rand() > .5 ? 'hi' : 'hello?');
		})
	);

	GLOBAL.spellMenu.push(
		new Button_Spell(innerWidth - dx, innerHeight - 192, tile(90), 5, () => {
			// create food
			GLOBAL.mana -= 5;
			GLOBAL.food += 10;
			zzfx(...[.9, , 588, , .03, .14, , 3.9, , -1, 650, .05, .04, , , , .08, .84, .3]);
			GLOBAL.showMessage('FOOD CREATED');
		}),
		new Button_Spell(innerWidth - dx, innerHeight - (192 + dx), tile(91), 8, () => {
			// healing
			GLOBAL.mana -= 8;
			for (let i = 0; i < GLOBAL.units.length; i++) {
				const unit = GLOBAL.units[i];
				if (unit.hitPoints < unit.maxHitPoints) {
					GLOBAL.vfxMan.addParticles(unit.pos, GLOBAL.vfxMan.heartPlusses);
					unit.hitPoints = min(unit.maxHitPoints, unit.hitPoints + 2);
				}
			}
			for (let i = 0; i < GLOBAL.buildings.length; i++) {
				const unit = GLOBAL.buildings[i];
				if (unit.hitPoints < unit.maxHitPoints) {
					GLOBAL.vfxMan.addParticles(unit.pos, GLOBAL.vfxMan.heartPlusses);
					unit.hitPoints = min(unit.maxHitPoints, unit.hitPoints + 2);
				}
			}
			zzfx(...[, , 244, , .05, .32, , 1.7, -2, , 421, .09, .02, , , , , .8, .15]);
			GLOBAL.showMessage('FRIENDS ARE HEALED');
		}),
		new Button_Spell(innerWidth - dx, innerHeight - (192 + dx * 2), tile(89), 10, () => {
			// poison
			GLOBAL.mana -= 10;
			for (let i = 0; i < GLOBAL.enemies.length; i++) {
				GLOBAL.vfxMan.addParticles(GLOBAL.enemies[i].pos, GLOBAL.vfxMan.gasPlumes);
				GLOBAL.enemies[i].takeDamage(1);
			}
			zzfx(...[.7,,530,.01,.14,.13,,.3,-10,,,,,,32,,.03,.3,.1,,346]);
			GLOBAL.showMessage('ENEMIES ARE SICKENED');
		}),
		new Button_Spell(innerWidth - dx, innerHeight - (192 + dx * 3), tile(88), 20, () => {
			// lightning
			GLOBAL.mana -= 20;
			for (let i = 0; i < GLOBAL.enemies.length; i++) {
				GLOBAL.vfxMan.addParticles(GLOBAL.enemies[i].pos, GLOBAL.vfxMan.sparks);
				GLOBAL.enemies[i].takeDamage(GLOBAL.enemies.length < 2 ? 4 : 2);
			}
			zzfx(...[2.8, , 48, , .23, .73, 4, 1.9, , -4, , , .21, .2, , .5, .41, .36, .07, .29]);
			GLOBAL.showMessage('ENEMIES ARE SMITED');
		})
	);

	GLOBAL.desiredCameraPos = cameraPos = DEFS.HOME;
	cameraScale = min(60, 60 * innerWidth / 900);

	GLOBAL.warriorIndex = 0;
	//GLOBAL.warriorTimer = new Timer(5);
	GLOBAL.warriorTimer = new Timer(150);

}
function gameUpdate() {

	if (GLOBAL.musicPlaying == GLOBAL.music && GLOBAL.enemies.length) {
		GLOBAL.music.source.stop();
		GLOBAL.music2.playMusic(1, true);
		GLOBAL.musicPlaying = GLOBAL.music2;
	}
	else if (GLOBAL.musicPlaying == GLOBAL.music2 && !GLOBAL.enemies.length) {
		GLOBAL.music2.source.stop();
		GLOBAL.music.playMusic(1, true);
		GLOBAL.musicPlaying = GLOBAL.music;
	}


	if (GLOBAL.state == DEFS.STATES.GAME_LOST) {

		if (mouseIsDown(0)) {
			clearInput();
			setTimeout(location.reload.bind(location), 2);
		}

		return;
	}
	else if (GLOBAL.state == DEFS.STATES.GAME_WON) {

		return;
	}

	if (GLOBAL.warriorIndex > 12 && !GLOBAL.enemies.length) {
		// game is won
		GLOBAL.state = DEFS.STATES.GAME_WON;

		GLOBAL.origCameraScale = cameraScale;
		GLOBAL.maxCameraScale = cameraScale * 2;
		GLOBAL.minCameraScale = cameraScale / 2;
		GLOBAL.dScale = -cameraScale / 100;

		return;
	}

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
					GLOBAL.wood -= 2;
					GLOBAL.stone -= 1;
					GLOBAL.buildings.push(new Building(vec2(x, y), vec2(1), tile(51)));
				}
				else {
					// house
					buildHouse(vec2(x, y));
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
		//GLOBAL.showMessage(def.name + '\nHAS LANDED IN THE \n' + def.from);
		
		// spawn enemies
		for (let i = 0; i < def.enemies.length; i += 2) {

			let tileInfo = tile(94 + randInt(0, 4) * 8);
			let size = vec2(1);
			let hitPoints = GLOBAL.warriorIndex > 10 ? 5 : GLOBAL.warriorIndex > 5 ? 4 : 3;

			if (i == 0) {
				// hero
				tileInfo = tile(def.heroTile || 6);
				size = vec2(def.heroSize || 1.2);
				// king gets double bonus
				hitPoints += GLOBAL.warriorIndex == 12 ? 12 : Math.floor(GLOBAL.warriorIndex / 2);
			}
			let enemy = new Unit_Enemy(vec2(def.enemies[i], def.enemies[i+1]), size, tileInfo, hitPoints);
			enemy.destination = DEFS.HOME;
			GLOBAL.enemies.push(enemy);

		}

		// place boat
		const x = def.enemies[0];
		const y = def.enemies[1];
		GLOBAL.boat.pos = vec2(x > 20 ? 33 : x < 5 ? 2 : 18, y > 20 ? 33 : y < 5 ? 2 : 18);

		
		if (GLOBAL.warriorIndex < 12) {
			//GLOBAL.warriorTimer.set(5);
			GLOBAL.warriorTimer.set(90);
		}
		else {
			GLOBAL.warriorTimer.unset();
		}

		GLOBAL.warriorIndex++;
	}

	// lerp camera
	if (cameraPos != GLOBAL.desiredCameraPos) {
		const diff = GLOBAL.desiredCameraPos.subtract(cameraPos);
		if (diff.length() < .2) {
			GLOBAL.desiredCameraPos = cameraPos;
		}
		cameraPos = cameraPos.add(diff.clampLength(diff.length() / 10));
	}

}

function buildHouse(pos) {
	const building = new Building(pos, vec2(1), tile(50));
	building.popSupport = 2;
	building.smokePos = building.pos.add(vec2(.3, .5));
	GLOBAL.wood -= 6;
	GLOBAL.stone -= 4;
	GLOBAL.buildings.push(building);
	return building;
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
		let unit1 = unitArray[index];
		
		for (let i = 0; i < unitArray.length; i++) {
			if (i == index) {
				continue;
			}
			let unit2 = unitArray[i];
			if (i < index) {
				// swap places
				const temp = unit1;
				unit1 = unit2;
				unit2 = temp;
			}
			const diff = unit2.pos.subtract(unit1.pos);
			if (diff.length() < .8) {
				// push units away from each other
				if (!unit1.shelter) {
					unit1.pos = unit1.pos.subtract(diff.clampLength(.002));
				}
				if (!unit2.shelter) {
					unit2.pos = unit2.pos.add(diff.clampLength(.002));
				}
				
			}
		}
	}

}

function loadMapData(callback) {

		const img = new Image(); 
		img.onload = function() {
			let canvas = document.createElement("canvas");
			canvas.height = img.height;
			let ctx = canvas.getContext("2d");

			ctx.drawImage(img, 0, 0);

			const data = ctx.getImageData(0, 144, 36, 36).data;

			// create map grid from image data
			GLOBAL.mapGrid = [];
			for (let y = 0; y < 36; y++) {
				GLOBAL.mapGrid[35 - y] = [];
				for (let x = 0; x < 36; x++) {
					const index = 4 * (y * 36 + x);
					let val = 0;
					if (data[index + 3] == 0
						|| (data[index] == 91 && data[index + 1] == 110 && data[index + 2] == 225)
						|| (data[index] == 34 && data[index + 1] == 32 && data[index + 2] == 52)) {
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

			// font
			const fontData = ctx.getImageData(0, 180, 96, 24);
			canvas = document.createElement("canvas");
			canvas.height = 24;
			canvas.width = 96;
			ctx = canvas.getContext("2d");
			ctx.putImageData(fontData, 0, 0);
			GLOBAL.fontImage = document.createElement('img');
			GLOBAL.fontImage.src = canvas.toDataURL("image/png");

			callback();
		}
		img.src = "t.png";
}
	

tileSizeDefault = vec2(12);

// wait for voices to load 
speechSynthesis.onvoiceschanged = function() {
	GLOBAL.voices = speechSynthesis.getVoices();

	//GLOBAL.voicesLoaded = true;
};

loadMapData(doEngineInit);
