
GLOBAL.vfxMan = {

	arrows: [],
	bloodDrops: [],
	gasPlumes: [],
	sparks: [],
	heartPlusses: [],
	manaBalls: [],
	smoke: [],

	showArrow (origin, target) {

		const arrow = new EngineObject(
			origin,
			1,
			tile(9),
			target.pos.subtract(origin).angle()
		);
		GLOBAL.vfxMan.arrows.push({
			object: arrow,
			origin: origin,
			target: target
		});
	},

	update () {
		
		for (let i = 0; i < GLOBAL.vfxMan.arrows.length; i++) {
			const arrow = GLOBAL.vfxMan.arrows[i];

			// travel vector
			const vec = arrow.target.pos.subtract(arrow.origin);

			arrow.object.pos = arrow.object.pos.add(vec.clampLength(.1));

			if (arrow.object.pos.subtract(arrow.target.pos).length() < .1) {
				// arrived
				arrow.target.takeDamage(1);
				zzfx(...[,.03,405,,,0,3,.1,8,,,,,.1,27,.4,.04,.44,.01]);
				arrow.object.destroy();
				GLOBAL.vfxMan.arrows.splice(GLOBAL.vfxMan.arrows.indexOf(arrow), 1);
			}
		}

	},

	render  () {
		
		// blood
		GLOBAL.vfxMan.updateParticles(GLOBAL.vfxMan.bloodDrops, function (drop) {
			drawRect(drop.pos, vec2(1 / 12), new Color(.7, .2, .2));
			// gravity
			drop.dy -= .002;
		});

		// gas
		GLOBAL.vfxMan.updateParticles(GLOBAL.vfxMan.gasPlumes, function (drop) {
			drawRect(drop.pos, vec2(3 / 12), new Color(.4, .7, .2, .4));
			drop.pos.y -= drop.dy / 2;
		});

		// health
		GLOBAL.vfxMan.updateParticles(GLOBAL.vfxMan.heartPlusses, function (drop) {
			drawRect(drop.pos, vec2(3 / 12, 1 / 12), new Color(.4, .7, .2));
			drawRect(drop.pos, vec2(1 / 12, 3 / 12), new Color(.4, .7, .2));
		});


		// sparks
		GLOBAL.vfxMan.updateParticles(GLOBAL.vfxMan.sparks, function (drop) {
			drawRect(drop.pos, vec2(1 / 12), new Color(1, .9, .2));
		});

		// manaballs
		GLOBAL.vfxMan.updateParticles(GLOBAL.vfxMan.manaBalls, function (drop) {
			drawRect(drop.pos, vec2(2 / 12), new Color(.4, .6, 1));
		});

		// smoke
		GLOBAL.vfxMan.updateParticles(GLOBAL.vfxMan.smoke, function (drop) {
			drawRect(drop.pos, vec2(2 / 12), new Color(.6, .7, .7, 1 - drop.lifetime / 40));
			drop.pos.x -= drop.dx / 2;
			drop.pos.y -= 3 * drop.dy / 4;
		});

	},

	updateParticles(array, funcDraw) {
		
		for (let i = 0; i < array.length; i++) {
			const drop = array[i];
			drop.pos.x += drop.dx;
			drop.pos.y += drop.dy;
			funcDraw(drop)
			drop.lifetime++;
			if (drop.lifetime > 40) {
				array.splice(i, 1);
				i--;
			}
		}
	},

	addParticles (pos, array, max=5) {
		
		const drops = randInt(1, max);

		for (let i = 0; i < drops; i++) {
			const angle = rand() * PI;
			array.push({
				pos: pos.copy(),
				dx: .01 * Math.cos(angle),
				dy: .05 * Math.sin(angle),
				lifetime: 0,
				
			})
		}
	}

};