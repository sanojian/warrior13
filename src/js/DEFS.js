/**
 * static definition variables
 */

const DEFS = {

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

	WARRIORS: [
		{
			number: 'FIRST',
			name: 'HALTAF THE YOUNG',
			heroTile: 102,
			from: 'NORTHEAST',
			enemies: [32, 32]
		},
		{
			number: 'SECOND',
			name: 'HYGLAK THE COMBATIVE',
			from: 'EAST',
			enemies: [32, 18, 30, 17]
		},
		{
			number: 'THIRD',
			name: 'HALGA THE WISE',
			heroTile: 118,
			from: 'SOUTHEAST',
			enemies: [32, 3, 30, 4, 32, 4]
		},
		{
			number: 'FOURTH',
			name: 'HELFDANE THE FAT',
			heroTile: 110,
			from: 'SOUTH',
			enemies: [18, 3, 17, 4, 19, 4]
		},
		{
			number: 'FIFTH',
			name: 'EDGTHO THE SILENT',
			heroTile: 102,
			from: 'SOUTHWEST',
			enemies: [3, 3, 4, 4, 5, 4, 6, 6]
		},
		{
			number: 'SIXTH',
			name: 'RAGNAR THE GRIM',
			heroTile: 94,
			from: 'WEST',
			enemies: [3, 18, 4, 19, 5, 20, 6, 21]
		},
		{
			number: 'SEVENTH',
			name: 'RETHEL THE ARCHER',
			from: 'NORTHWEST',
			enemies: [3, 32, 4, 30, 5, 31, 6, 30]
		},
		{
			number: 'EIGTH',
			name: 'HERGER THE JOYOUS',
			from: 'NORTH',
			enemies: [18, 32, 19, 30, 18, 31, 19, 31]
		},
		{
			number: 'NINTH',
			name: 'WEATH THE MUSICAL',
			from: 'NORTHEAST',
			enemies: [32, 32, 30, 30, 32, 30, 31, 31, 32, 31]
		},
		{
			number: 'TENTH',
			name: 'SKELD THE WARY',
			from: 'EAST',
			enemies: [32, 18, 30, 17, 32, 17, 32, 19, 30, 18]
		},
		{
			number: 'ELEVENTH',
			name: 'RONETH THE QUICK',
			from: 'SOUTHEAST',
			enemies: [32, 3, 30, 4, 32, 4, 31, 4, 31, 3]
		},
		{
			number: 'TWELFTH',
			name: 'EBEN FADLUN',
			heroTile: 108,
			from: 'SOUTH',
			enemies: [18, 3, 17, 4, 19, 4, 18, 4, 17, 5]
		},
		{
			number: 'THIRTEENTH',
			name: 'BEOWULF THE KING',
			heroTile: 116,
			from: 'SOUTHWEST',
			enemies: [3, 3, 4, 4, 5, 4, 4, 19, 5, 20, 6, 21, 17, 4, 19, 4, 18, 4, 17, 5]
		},
		
	]

};

