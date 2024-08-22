
GLOBAL.inputMan = {

	update() {

		if (mouseIsDown(0)) {

			if (!GLOBAL.spoken) {
				GLOBAL.speak('Welcome');
				GLOBAL.spoken = true;
			}

			clearInput();

			// check UI

			if (GLOBAL.miniMap.isOver(mousePos.x, mousePos.y)) {
				return;
			}

			for (let i = 0; GLOBAL.state == DEFS.STATES.TRAIN_MENU && i < GLOBAL.trainMenu.length; i++) {
				if (GLOBAL.trainMenu[i].isOver(mousePos.x, mousePos.y)) {
					return;
				}
			}
			for (let i = 0; GLOBAL.state == DEFS.STATES.BUILD_MENU && i < GLOBAL.buildMenu.length; i++) {
				if (GLOBAL.buildMenu[i].isOver(mousePos.x, mousePos.y)) {
					return;
				}
			}
			for (let i = 0; GLOBAL.state == DEFS.STATES.TOWNHALL_MENU && i < GLOBAL.townHallMenu.length; i++) {
				if (GLOBAL.townHallMenu[i].isOver(mousePos.x, mousePos.y)) {
					return;
				}
			}

			const wereSelected = [];
			for (let i = 0; i < GLOBAL.units.length; i++) {
				const unit = GLOBAL.units[i];
				
				unit.selected && wereSelected.push(unit);
				const wasSelected = unit.selected;
				unit.isOver(mousePos.x, mousePos.y);

				if (unit.selected && wasSelected) {
					// de-select unit
					unit.selected = false;
					GLOBAL.state = 0;
					return;
				}
				if (unit.selected) {
					// done here
					return;
				}
					
			}

			// get clicked tile
			let x = Math.max(0, Math.min(35, Math.round(mousePos.x)));
			let y = Math.max(0, Math.min(35, Math.round(mousePos.y)));
			const tile = GLOBAL.mapGrid[y][x];
			
			if (tile) {

				tile.handleClick && tile.handleClick(wereSelected);
				return;
			}


			// this was an order to selected units
			for (let i = 0; i < wereSelected.length; i++) {
				const unit = wereSelected[i];

				// move command
				unit.takeOrder('move', { pos: mousePos });
				unit.intention = undefined;
			}
		}

	}
};