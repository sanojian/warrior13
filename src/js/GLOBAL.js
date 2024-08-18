/**
 * global variables
 */

const GLOBAL = {

	trees: [],
	stones: [],
	units: [],
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
	}
};