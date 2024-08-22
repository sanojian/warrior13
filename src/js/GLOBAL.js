/**
 * global variables
 */

const GLOBAL = {

	trees: [],
	stones: [],
	units: [],
	enemies: [],
	buildings: [],

	// UI
	trainMenu: [],
	buildMenu: [],
	townHallMenu: [],

	state: 0,

	wood: 110,
	stone: 110,

	voiceIndex: 47,
	phrases: {},
	voices: [],

	getSupportedPop: function () {
		let supported = 0;
		for (let i = 0; i < GLOBAL.buildings.length; i++) {
			const building = GLOBAL.buildings[i];

			supported += building.needsBuilt ? 0 : building.popSupport;
		}
		return supported;
	},

	spoken: false,
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
	}	
};