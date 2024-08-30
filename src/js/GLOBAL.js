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

	wood: 12,
	stone: 10,
	food: 5,
	mana: 5,

	voiceIndex: 47,
	phrases: {},
	voices: [],

	messageTimer: new Timer(),
	message: '',

	countWorkers: function () {

		let count = 0;
		for (let i = 0; i < GLOBAL.units.length; i++) {
			if (GLOBAL.units[i] instanceof Unit_Worker) {
				count++;
			}
		}
		return count;
	},

	getSupportedPop: function () {
		let supported = 0;
		for (let i = 0; i < GLOBAL.buildings.length; i++) {
			const building = GLOBAL.buildings[i];

			supported += building.needsBuilt ? 0 : building.popSupport;
		}
		return supported;
	},

	speak: function (phrase, voiceIndex, pitch, rate) {

		/*if (!GLOBAL.voicesLoaded) {
			return;
		}*/
		const T2S = window.speechSynthesis || speechSynthesis; 
		var utter = GLOBAL.phrases[phrase] || new SpeechSynthesisUtterance(phrase);
		GLOBAL.phrases[phrase] = utter;

		// 36 Rocko
		// 47 Zarvox
		//const voices = T2S.getVoices();
		// TODO: voices on mobile and safari/firefox
		voiceIndex = voiceIndex || GLOBAL.voiceIndex || 47;
		// check voice available, choose random if not
		voiceIndex = voiceIndex > GLOBAL.voices.length - 1 ? Math.floor(Math.random() * GLOBAL.voices.length) : voiceIndex;

		utter.voice = T2S.getVoices()[voiceIndex];
		// will use default voice first time
		utter.pitch = pitch || 1.5;
		utter.volume = 0.5;
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
			drawRect(center, vec2(maxHitPoints  / 12, 1 / 12), new Color(172 / 255, 50 / 255, 50 / 255));
			for (let i = 0; i < hitPoints; i++) {
				drawRect(pos, vec2(1 / 12), new Color(106 / 255, 190 / 255, 48 / 255));
				pos.x += 1 / 12;
			}
		}

	}
};