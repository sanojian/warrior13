
GLOBAL.inputMan = {

	update() {

		let itemSelected = false;
		let orderGiven = false;

		if (mouseIsDown(0)) {

			clearInput();

			// check UI
			for (let i = 0; i < GLOBAL.buttons.length; i++) {
				if (GLOBAL.buttons[i].isOver(mousePos.x, mousePos.y)) {
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
					return;
				}
				itemSelected = itemSelected || unit.selected;
					
			}
			for (let i = 0; i < GLOBAL.trees.length && !itemSelected; i++) {
				const tree = GLOBAL.trees[i];
				
				if (tree.isOver(mousePos.x, mousePos.y)) {
				
					for (let u = 0; u < wereSelected.length; u++) {
						wereSelected[u].takeOrder('chop', tree);
						orderGiven = true;
					}
				}
					
			}
			for (let i = 0; i < GLOBAL.stones.length && !itemSelected; i++) {
				const stone = GLOBAL.stones[i];
				
				if (stone.isOver(mousePos.x, mousePos.y)) {
				
					for (let u = 0; u < wereSelected.length; u++) {
						wereSelected[u].takeOrder('mine', stone);
						orderGiven = true;
					}
				}
					
			}

			for (let i = 0; i < GLOBAL.buildings.length && !itemSelected; i++) {
				const building = GLOBAL.buildings[i];

				if (building.isOver(mousePos.x, mousePos.y)) {

					for (let u = 0; u < wereSelected.length; u++) {
						wereSelected[u].takeOrder('store', building);
						orderGiven = true;
					}
				}
			}

			if (!itemSelected || orderGiven) {
				// this was an order to selected units
				for (let i = 0; i < wereSelected.length; i++) {
					const unit = wereSelected[i];
					unit.selected = true;

					// move command
					unit.destination = vec2(mousePos);
					if (!orderGiven) {
						unit.intention = undefined;
					}
				}
			}
		}

	}
};