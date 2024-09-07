/**
 * global variables
 */

const GLOBAL = {

	trees: [],
	stones: [],
	units: [],
	enemies: [],
	buildings: [],
	boat: undefined,

	// UI
	trainMenu: [],
	buildMenu: [],
	townHallMenu: [],
	spellMenu: [],

	state: 0,

	wood: 24,
	stone: 16,
	food: 5,
	mana: 5,

	voiceIndex: 47,
	phrases: {},
	voices: [],

	messageTimer: new Timer(),
	message: '',

	// for win screen
	origCameraScale: 0,
	maxCameraScale: 0,
	minCameraScale: 0,
	dScale: 0,
	desiredCameraPos: cameraPos,

	// for selection box
	startSelect: undefined,

	countWorkers () {

		let count = 0;
		for (let i = 0; i < GLOBAL.units.length; i++) {
			if (!GLOBAL.units[i].weapon) {
				count++;
			}
		}
		return count;
	},

	getSupportedPop () {
		let supported = 0;
		for (let i = 0; i < GLOBAL.buildings.length; i++) {
			const building = GLOBAL.buildings[i];

			supported += building.needsBuilt ? 0 : building.popSupport;
		}
		return supported;
	},

	speak (phrase, voiceIndex, pitch, rate) {

		/*if (!GLOBAL.voicesLoaded) {
			return;
		}*/

		phrase = phrase.toLowerCase();

		const T2S = window.speechSynthesis || speechSynthesis; 
		var utter = GLOBAL.phrases[phrase] || new SpeechSynthesisUtterance(phrase);
		GLOBAL.phrases[phrase] = utter;

		// 36 Rocko
		// 47 Zarvox
		//const voices = T2S.getVoices();
		// TODO: voices on mobile and safari/firefox
		voiceIndex = voiceIndex || GLOBAL.voiceIndex || 47;
		// check voice available, choose random if not
		voiceIndex = voiceIndex > GLOBAL.voices.length - 1 ? randInt(0, GLOBAL.voices.length) : voiceIndex;

		const voices = T2S.getVoices();
		if (!voices.length) {
			return;
		}
		utter.voice = voices[voiceIndex];
		let index = 0;
		while (utter.voice.lang.substr(0, 2) != 'en') {
			// find an english voice
			utter.voice = voices[index++];
		}
		// will use default voice first time
		utter.pitch = pitch || 1.5;
		utter.volume = .5;
		utter.rate = rate || 2;
		T2S.cancel();
		T2S.speak(utter);
	},

	showMessage(message) {

		GLOBAL.message = message;
		GLOBAL.messageTimer = new Timer(3);
	},

	drawHealthBar(center, hitPoints, maxHitPoints) {
		// health bar
		if (hitPoints < maxHitPoints) {
			const pos = center.subtract(vec2(maxHitPoints / 24, 0));

			drawRect(center, vec2((maxHitPoints + 2) / 12, 3 / 12), new Color(0, 0, 0));
			drawRect(center, vec2(maxHitPoints  / 12, 1 / 12), new Color(.7, .2, .2));
			for (let i = 0; i < hitPoints; i++) {
				drawRect(pos, vec2(1 / 12), new Color(.4, .7, .2));
				pos.x += 1 / 12;
			}
		}

	},

	musicPlaying: false,

};

var musicDef = [
		[
			// instruments
			[.3, 0, 400], [.1, 0, 220, , .33, , 2]
		],
		[
			// patterns
			[
				[, , 3, , , , , , 3, , 15, , , , , , 3, , , , , , , , 3, , 15, , , , , , , , 2, , , , , , 2, , 14, , , , , , 2, , , , , , , , 2, , 14, , , , , , , ,],
				[1, , 25, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 24, , 22, , 20, , 17, , , , , , , , , , , , , , , , , , , , , , , , , ,],
			],
			[
				,//[, , 3, , , , , , 3, , 15, , , , , , 3, , , , , , , , 3, , 15, , , , , , , , 2, , , , , , 2, , 14, , , , , , 2, , , , , , , , 2, , 14, , , , , , , ,],
				[1, , 17, , , , 20, , , , 20, , , , 20, , , , , , , , , , , , , , , , , , , , 17, , , , 18, , 17, , , , , , 18, , , , 17, , , , , , 18, , 17, , , , 15, , , ,],
			]
		],
		[0, 0, 1, 1],
		116
	],

// finish the song
	screenClicked,
	musicPat0 = musicDef[1][0],
	musicPat1 = musicDef[1][1];
musicPat1[0] = musicPat0[0];

// make second song
GLOBAL.music = new Music(musicDef);
// swap instruments
musicDef[0].reverse();

musicPat0.splice(1);
musicPat1.splice(1);
musicDef[3] = 160;
GLOBAL.music2 = new Music(musicDef);