
GLOBAL.vfxMan = {

	arrows: [],

	showArrow: function(origin, destination, timer) {

		const arrow = new EngineObject(
			origin,
			vec2(1),
			tile(9),
			destination.subtract(origin).angle()
		);
		this.arrows.push({
			object: arrow,
			origin: origin,
			destination: destination,
			timer: timer
		});
	},

	update: function() {
		
		for (let i = 0; i < GLOBAL.vfxMan.arrows.length; i++) {
			const arrow = GLOBAL.vfxMan.arrows[i];

			const vec = arrow.destination.subtract(arrow.origin);

			arrow.object.pos = arrow.origin.add(vec.clampLength(vec.length() * arrow.timer.getPercent()));

			if (arrow.timer.elapsed()) {
				arrow.object.destroy();
				GLOBAL.vfxMan.arrows.splice(GLOBAL.vfxMan.arrows.indexOf(arrow), 1);
			}
		}
	}
};