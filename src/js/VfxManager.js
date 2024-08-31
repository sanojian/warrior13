
GLOBAL.vfxMan = {

	arrows: [],
	bloodDrops: [],
	gasPlumes: [],
	sparks: [],
	heartPlusses: [],

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
		
		// blood
		for (let i = 0; i < GLOBAL.vfxMan.bloodDrops.length; i++) {
			const drop = GLOBAL.vfxMan.bloodDrops[i];
			drop.pos.x += drop.dx;
			drop.pos.y += drop.dy;
			drawRect(drop.pos, vec2(1 / 12), DEFS.COLORS.red);
			drop.lifetime++;
			// gravity
			drop.dy -= 0.002;
			if (drop.lifetime > 40) {
				GLOBAL.vfxMan.bloodDrops.splice(i, 1);
				i--;
			}
		}

		// gas
		for (let i = 0; i < GLOBAL.vfxMan.gasPlumes.length; i++) {
			const drop = GLOBAL.vfxMan.gasPlumes[i];
			drop.pos.x += drop.dx;
			drop.pos.y += drop.dy / 10;
			drawRect(drop.pos, vec2(3 / 12), new Color(106 / 255, 190 / 255, 48 / 255, 0.4));
			drop.lifetime++;
			// gravity
			if (drop.lifetime > 40) {
				GLOBAL.vfxMan.gasPlumes.splice(i, 1);
				i--;
			}
		}

		// health
		for (let i = 0; i < GLOBAL.vfxMan.heartPlusses.length; i++) {
			const drop = GLOBAL.vfxMan.heartPlusses[i];
			drop.pos.x += drop.dx;
			drop.pos.y += drop.dy;
			drawRect(drop.pos, vec2(3 / 12, 1 / 12), new Color(106 / 255, 190 / 255, 48 / 255));
			drawRect(drop.pos, vec2(1 / 12, 3 / 12), new Color(106 / 255, 190 / 255, 48 / 255));
			drop.lifetime++;
			// gravity
			if (drop.lifetime > 40) {
				GLOBAL.vfxMan.heartPlusses.splice(i, 1);
				i--;
			}
		}


		// sparks
		for (let i = 0; i < GLOBAL.vfxMan.sparks.length; i++) {
			const drop = GLOBAL.vfxMan.sparks[i];
			drop.pos.x += drop.dx;
			drop.pos.y += drop.dy;
			drawRect(drop.pos, vec2(1 / 12), new Color(251 / 255, 242 / 255, 54 / 255));
			drop.lifetime++;
			// gravity
			if (drop.lifetime > 40) {
				GLOBAL.vfxMan.sparks.splice(i, 1);
				i--;
			}
		}

	},

	addParticles: function (pos, array) {
		
		const drops = 1 + Math.floor(Math.random() * 4);

		for (let i = 0; i < drops; i++) {
			const angle = Math.random() * PI;
			array.push({
				pos: pos.copy(),
				dx: 0.01 * Math.cos(angle),
				dy: 0.05 * Math.sin(angle),
				lifetime: 0,
				
			})
		}
	}

};