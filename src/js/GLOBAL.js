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
	buildMenu: [],
	townHallMenu: [],

	state: 0,

	wood: 10,
	stone: 10,

	getSupportedPop: function () {
		let supported = 0;
		for (let i = 0; i < GLOBAL.buildings.length; i++) {
			const building = GLOBAL.buildings[i];

			supported += building.needsBuilt ? 0 : building.popSupport;
		}
		return supported;
	},

	spoken: false,
	speak: function (phrase) {
		const T2S = window.speechSynthesis || speechSynthesis; 
		var utter = new SpeechSynthesisUtterance(phrase); 
		// 36 Rocko
		// 47 Zarvox
		const voices = T2S.getVoices();
		GLOBAL.voiceIndex = GLOBAL.voiceIndex || 47;
		// check voice available, choose random if not
		GLOBAL.voiceIndex = GLOBAL.voiceIndex > voices.length - 1 ? Math.floor(Math.random() * voices.length) : GLOBAL.voiceIndex;
		utter.voice = T2S.getVoices()[GLOBAL.voiceIndex];
		// will use default voice first time
		utter.pitch = 1.5;
		utter.volume = 0.5;
		utter.rate = 2;
		T2S.speak(utter);
	}	
};