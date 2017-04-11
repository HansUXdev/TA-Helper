var $        	= require('gulp-load-plugins')();
var argv     	= require('yargs').argv;
var gulp     	= require('gulp');
var rimraf   	= require('rimraf');
var requireDir 	= require('require-dir');
var router   	= require('front-router');
var sequence 	= require('run-sequence');
var fs 			= require('fs');
var shell 	 	= require('gulp-shell');
var GulpSSH 	= require('gulp-ssh');
var exec 		= require('gulp-exec');

// Settings
var site= "https://github.com/";

// This is just for testing
var username= "/HansUXdev";

// The naming should be standardized
	// "Basic-Portfolio";
	// "/repair-hub";
	var reponame = "/Basic-Portfolio";
// 
	var studentList = [
		// "HansUXdev" // for testing
		"peques",
		"jeffhatch"

		// "joselsalazar",
		// "Cperez2187",
		// "tkappha",
		// "Lolobrew",
		// "Cperez2187",
		// "afflatus480",
		// "cqliu1",
		// "jeffhatch",
		// "peques",
		// "wesvanduine"
	];

  var options = {
    continueOnError: false, // default = false, true means don't emit error event 
    pipeStdout: false, // default = false, true means stdout is written to file.contents 
    customTemplatingThing: "test" // content passed to gutil.template() 
  };
  var reportOptions = {
  	err: true, // default = true, false means don't write err 
  	stderr: true, // default = true, false means don't write stderr 
  	stdout: true // default = true, false means don't write stdout 
  }

// 1. Clone repos
// Create a task that loops through a list of users and clone each repo in a "build folder"
// - - - - - - - - - - - - - - -
	// function should loop through the studentList and return a list(array) strings 
	// which are then passing into the exec command

	var urlList = [];
	for (var i = 0; i < studentList.length; i++) {	
		urlList[i] = 'git clone '+site+studentList[i]+reponame
		// console.log( 'git clone '+site+studentList[i]+reponame)
	};

	gulp.task('clone', function() {
		return gulp.src('./**/**')
	    .pipe(
	    	// how it should look...
		    	exec([urlList],options)
	    	// Test example
	    		// test example that should work...
			    	// exec([
			    	// 	'git clone https://github.com/peques/Basic-Portfolio',
			    	// 	'git clone https://github.com/jeffhatch/Basic-Portfolio'
			    	// 	],
			    	// options)
	    )
	    // comment out the line below
	    .pipe(exec.reporter(reportOptions));
	});

// 2. Lint the student files
// Create a task that lints the students html, css and js
// - - - - - - - - - - - - - - -



// 3. Server
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
gulp.task('default', ['server'], function () {
  
  // gulp.watch(['./client/**/*.*', '!./client/templates/**/*.*', '!./client/assets/{scss,js}/**/*.*'], ['copy']);

});