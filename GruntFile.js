/** @format */
// NOTE: To uglify, roadroll and pack everything run the ./build.sh script

module.exports = function (grunt) {
	const path = require("path");

	// Load Grunt tasks declared in the package.json file
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({
		watch: {
			scripts: {
				files: [
					"GruntFile.js",
					"src/js/**/*.js",
					"src/maps/**/*.json",
					"src/gfx/**/*",
					"dist/lib/*.js",
				],
				tasks: ["build"],
				options: {
					interrupt: true,
					reload: true,
					//livereload: true,
				},
			},
			pages: {
				files: ["src/html/*.*"],
				tasks: ["concat:dev"],
				options: {
					//livereload: true,
				},
			},
		},

		"http-server": {
			dev: {
				root: "dist",
				port: 3217,
				runInBackground: true,
				cache: 0,
			},
		},

		image: {
			dev: {
				options: {
					optipng: true,
					pngquant: false,
					zopflipng: false,
				},
				files: {
					"dist/tiles.png": "src/gfx/tiles.png"
				},
			},
			prod: {
				options: {
					optipng: ["-o 7", "-zc 7"],
					//pngquant: ['-s1', '--quality=40-60'],
					pngquant: ["-s1"],
					zopflipng: ["-m"],
				},
				files: {
					"dist/t.png": "src/gfx/tiles.png",
				},
			},
		},

		closureCompiler: {
			options: {
				compilerFile: "node_modules/google-closure-compiler-java/compiler.jar",
				compilerOpts: {
					compilation_level: "SIMPLE_OPTIMIZATIONS",
					language_out: "ECMASCRIPT_2019",
					jscomp_off: "checkVars",
					assume_function_wrapper: true,
				},
			},
			targetName: {
				src: "dist/js/index_prod.js",
				dest: "dist/js/index_closure.js",
			},
		},

		clean: ["dist/*.html", "dist/*.zip", "dist/*.js", "dist/*.png", "dist/js/"],

		concat: {
			dev: {
				files: {
					"dist/index.html": ["src/html/index_dev.html"],
				},
			},
			shared: {
				files: {
					"dist/index.js": [
						"src/js/lib/*.js",
						"src/js/main.js",
						"src/js/DEFS.js",
						"src/js/gameEffects.js",
						"src/js/gameLevel.js",
						"src/js/gameLevelData.js",
						"src/js/gameObjects.js",
						"src/js/**/*.js",
					],
				},
			},
			/*prod: {
				files: {
					"dist/index.html": ["src/html/index_prod.html"],
					"dist/js/index_prod.js": [
						"dist/lib/engine.all.js",
						"dist/lib/easystar-0.4.4.js",
						"dist/lib/tweenjs.js",
						"dist/js/index.js",
					],
				},
			},*/
		},
		obfuscator: {
			options: {
				banner:
					'/*! Copyright Lax Viking Games <%= grunt.template.today("yyyy") %> - ' +
					'Built <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				domainLock: [
					"localhost",
					"127.0.0.1",
					".poki.com", // poki
					".poki-gdn.com", // poki test
					".poki.io", // also poki
					".po.ki", // poki QA tool
					".laxviking.com", // our AWS server
				],
				domainLockRedirectUrl: "https://poki.com",
				compact: true,
				controlFlowFlattening: false,
				deadCodeInjection: false,
				debugProtection: false,
				debugProtectionInterval: false,
				disableConsoleOutput: false,
				identifierNamesGenerator: "hexadecimal",
				log: false,
				renameGlobals: false,
				rotateStringArray: true,
				selfDefending: true,
				stringArray: false, // changed from high performace settings
				stringArrayEncoding: ["none"],
				stringArrayThreshold: 0.75,
				unicodeEscapeSequence: false,
			},
			task1: {
				files: {
					"dist/index.js": ["dist/js/index_closure.js"],
				},
			},
		},
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks("grunt-contrib-watch");

	/*grunt.registerTask('rollup', 'combine html and js', function () {

		let src = grunt.file.read('dist/js/index_prod.js');

		grunt.file.write('dist/index.html', '<script>' + src + '</script>');

	});*/


	grunt.registerTask("dev", ["watch"]);

	grunt.registerTask("build", ["clean", "concat:dev", "concat:shared", "image:dev"]);

	grunt.registerTask("default", ["build", "http-server", "dev"]);

	grunt.registerTask("prod", ["clean", "processMap", "image:prod", "concat:shared", "concat:prod", "closureCompiler"]);

	grunt.registerTask("web", ["http-server", "dev"]);
};
