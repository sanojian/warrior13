/**
 * static definition variables
 */

const DEFS = {

	TILE_SIZE: 12,

	HOME: vec2(15),

	STATES: {
		BUILD_HOUSE: 1,
		TOWNHALL_MENU: 2,
		BUILD_MENU: 3,
		BUILD_BARRACKS: 4,
		TRAIN_MENU: 5,
		BUILD_FARM: 6,
		BUILD_WALL: 7,
		GAME_LOST: 8,
		GAME_WON: 9
	},

	COLORS: {
		red: new Color(172 / 255, 50 / 255, 50 / 255)
	},

	WARRIORS: [
		{
			number: 'first',
			name: 'Haltaf the young',
			heroTile: 102,
			from: 'northeast',
			enemies: [32, 32]
		},
		{
			number: 'second',
			name: 'Hyglak the combative',
			from: 'east',
			enemies: [32, 18, 30, 17]
		},
		{
			number: 'third',
			name: 'Halga the wise',
			heroTile: 118,
			from: 'southeast',
			enemies: [32, 3, 30, 4, 32, 4]
		},
		{
			number: 'fourth',
			name: 'Helfdane the fat',
			heroTile: 110,
			from: 'south',
			enemies: [18, 3, 17, 4, 19, 4]
		},
		{
			number: 'fifth',
			name: 'Edgtho the silent',
			heroTile: 102,
			from: 'southwest',
			enemies: [3, 3, 4, 4, 5, 4, 6, 6]
		},
		{
			number: 'sixth',
			name: 'Ragnar the grim',
			heroTile: 94,
			from: 'west',
			enemies: [3, 18, 4, 19, 5, 20, 6, 21]
		},
		{
			number: 'seventh',
			name: 'Rethel the archer',
			from: 'northwest',
			enemies: [3, 32, 4, 30, 5, 31, 6, 30]
		},
		{
			number: 'eighth',
			name: 'Herger the joyous',
			from: 'north',
			enemies: [18, 32, 19, 30, 18, 31]
		},
		{
			number: 'ninth',
			name: 'Weath the musical',
			from: 'northeast',
			enemies: [32, 32, 30, 30, 32, 30]
		},
		{
			number: 'tenth',
			name: 'Skeld the wary',
			from: 'east',
			enemies: [32, 18, 30, 17, 32, 17]
		},
		{
			number: 'eleventh',
			name: 'Roneth the quick',
			from: 'southeast',
			enemies: [32, 3, 30, 4, 32, 4]
		},
		{
			number: 'twelfth',
			name: 'Eben Fadlan',
			heroTile: 108,
			from: 'south',
			enemies: [18, 3, 17, 4, 19, 4]
		},
		{
			number: 'thirteenth',
			name: 'Beowulf the king',
			heroTile: 116,
			from: 'southwest',
			enemies: [3, 3, 4, 4, 5, 4]
		},
		
	]

};

function round(num) { return Math.round(num) }