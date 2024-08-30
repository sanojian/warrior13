
GLOBAL.vfxMan = {

	arrows: [],
	bloodDrops: [],

	showArrow: function(origin, destination, timer) {

		const arrow = new EngineObject(
			origin,
			vec2(1),
			tile(9),
			destination.subtract(origin).angle()
		);
		GLOBAL.vfxMan.arrows.push({
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

	},

	render: function () {
		
		for (let i = 0; i < GLOBAL.vfxMan.bloodDrops.length; i++) {
			const drop = GLOBAL.vfxMan.bloodDrops[i];
			drop.pos.x += drop.dx;
			drop.pos.y += drop.dy;
			drawRect(drop.pos, vec2(1 / 12), new Color(172 / 255, 50 / 255, 50 / 255));
			drop.lifetime++;
			// gravity
			drop.dy -= 0.002;
			if (drop.lifetime > 40) {
				GLOBAL.vfxMan.bloodDrops.splice(i, 1);
				i--;
			}
		}
	},

	throwBlood: function (pos) {
		
		const drops = 1 + Math.floor(Math.random() * 4);

		for (let i = 0; i < drops; i++) {
			const angle = Math.random() * PI;
			GLOBAL.vfxMan.bloodDrops.push({
				pos: pos.copy(),
				dx: 0.01 * Math.cos(angle),
				dy: 0.05 * Math.sin(angle),
				lifetime: 0,
				
			})
		}
	}
};