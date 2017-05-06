var $        	= require('gulp-load-plugins')();
var argv     	= require('yargs').argv;
var gulp     	= require('gulp');
var rimraf   	= require('rimraf');
var requireDir 	= require('require-dir');
var sequence 	= require('run-sequence');
var fs 			= require('fs');
var shell 	 	= require('gulp-shell');
var GulpSSH 	= require('gulp-ssh');
var exec 		= require('gulp-exec');
var csslint 	= require('gulp-csslint');
var gutil 		= require('gulp-util');
var jslint 		= require('gulp-jslint');
	// var htmlReporter = require('gulp-csslint-report');

// Settings
var site= "https://github.com/";

// This is just for testing
var username= "/HansUXdev";

// 
// wesvanduine & kabrittan & heythisispaul

// The naming should be standardized
	// "quickDemoApp";
	// "Basic-Portfolio";
	// bootstrap-portfolio
	// Hangman-Game
	// Psychic-Game
	// responsive-portfolio
	var reponame = "/week-4-game";

	var studentList = [
		// "HansUXdev" // for testing
		/////// Hans's Students
		"azcactus",	   	 	// Travis
		'jalilakhtar',   	// Jalil
		"nverges",		 	// Nick
		"afflatus480", 	 	// Robert
		"nathan25maloney",  // Nathan
		"okaif90",			//
		"ptk88",		 	// Phil
		"peques", 		 	// Saul
		"tkappha", 	   	 	// Tami
		"heythisispaul", 	// Paul Richards //js
		///////////////
		// COAL
		///////////////
		"kabrittan",		// kyle
		"wesvanduine", 	 	// Wes
// nverges/Psychic-Game
		// "peques",
		// "jeffhatch",
		// "joselsalazar",
		// "jeffhatch",
		// "Lolobrew",
		// "Cperez2187",
		// "afflatus480",
		// "cqliu1",
		// "heythisispaul",
	];

  var options = {
    continueOnError: true, // default = false, true means don't emit error event 
    pipeStdout: false, // default = false, true means stdout is written to file.contents 
    customTemplatingThing: "test" // content passed to gutil.template() 
  };
  var reportOptions = {
  	err: false, // default = true, false means don't write err 
  	stderr: true, // default = true, false means don't write stderr 
  	stdout: true // default = true, false means don't write stdout 
  }

// 1. Clone repos
// Create a task that loops through a list of users and clone each repo in a "build folder"
// - - - - - - - - - - - - - - 
	var urlList = [];
	for (var i = 0; i < studentList.length; i++) {
		// For new students add 'mkdir '+studentList[i]+ ' && cd '	
		// clone individually
			// urlList[i] = 'cd students/'+studentList[i]+ ' && git clone '+site+studentList[i]+reponame
		// one giant command to clone them all
			urlList[i] = 'git clone '+site+studentList[i]+reponame +" students/"+studentList[i]+reponame +" && "
	};

	gulp.task('clone', function() {
		return gulp.src('./**/**')
		// Fuck it, hack it and repeat manually with the index number
		.pipe(exec(urlList[0],options))
		.pipe(exec(urlList[1],options))
		.pipe(exec(urlList[2],options))
		.pipe(exec(urlList[3],options))
		.pipe(exec(urlList[4],options))
		.pipe(exec(urlList[5],options))
		.pipe(exec(urlList[6],options))
		.pipe(exec(urlList[7],options))
		// .pipe(exec(urlList[8],options))
		// .pipe(exec(urlList[9],options))
		// .pipe(exec(urlList[10],options))
		// .pipe(exec(urlList[11],options))
		// .pipe(gulp.dest('./test'));
	    // .pipe(exec(urlList[1],options))
	    // comment out the line below
	    .pipe(exec.reporter(reportOptions));
	});

// (). Add task to pull any changes for each repo
// Create a task that loops through each student repo, lints the students html, css and js and exports a report
// - - - - - - - - - - - - - - -


// (). Lint the student files
// Create a task that loops through each student repo, lints the students html, css and js and exports a report
// - - - - - - - - - - - - - - -


 
	gulp.task('jslint', function () {
	    return gulp.src([studentList+''])
	            .pipe(jslint({ /* this object represents the JSLint directives being passed down */ }))
	            .pipe(jslint.reporter( 'my-reporter' ));
	});

	gulp.task('css', function() {
	  gulp.src('joselsalazar'+reponame+'/assets/css/*.css')
	    .pipe(csslint())
	    // .pipe(htmlReporter());
	});



	 
	// var customReporter = function(file) {
	//   gutil.log(gutil.colors.cyan(file.csslint.errorCount)+' errors in '+gutil.colors.magenta(file.path));
	 
	//   file.csslint.results.forEach(function(result) {
	//     gutil.log(result.error.message+' on line '+result.error.line);
	//   });
	// };
	 
	gulp.task('lint', function() {
	  gulp.files('lib/*.css')
	    .pipe(csslint())
	    .pipe(csslint.reporter(customReporter));
	});


// (). Server
// Create a task to open up each students project in a new tab
// - - - - - - - - - - - - - - -

	// Starts a test server, which you can view at http://localhost:8079
	gulp.task('server', ['build'], function() {
		// for (var i = 0; i < username.length; i++)
		gulp.src('./build')
		.pipe($.webserver({
			port: 8079,
			host: 'localhost',
			fallback: 'index.html',
			livereload: true,
			open: true
		}))
		;
		// }
	});



// Default task: builds your app, starts a server, and recompiles assets when they change
gulp.task('default', ['s'], function () {
  
  // gulp.watch(['./client/**/*.*', '!./client/templates/**/*.*', '!./client/assets/{scss,js}/**/*.*'], ['copy']);

});