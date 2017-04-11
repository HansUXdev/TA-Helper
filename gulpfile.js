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
	// "quickDemoApp";
	// "Basic-Portfolio";
	// "/repair-hub";
	var reponame = "/Basic-Portfolio";
// 
	var studentList = [
		// "HansUXdev" // for testing
		"peques",
		"jeffhatch",
		"joselsalazar",
		"jeffhatch",
		"Lolobrew",
		"ptk88",
		"wesvanduine",
		"Cperez2187",
		"tkappha",
		"Cperez2187",
		"afflatus480",
		"cqliu1",
		"heythisispaul",
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
		urlList[i] = 'mkdir '+studentList[i]+' && cd '+studentList[i]+ ' && git clone '+site+studentList[i]+reponame
		// urlList[i] = 'mkdir ' 0+i++ +'cd ' i++ +'git clone '+site+studentList[i]+reponame
		// console.log( 'git clone '+site+studentList[i]+reponame)
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
		.pipe(exec(urlList[8],options))
		.pipe(exec(urlList[9],options))
		.pipe(exec(urlList[10],options))
		.pipe(exec(urlList[11],options))
		// .pipe(gulp.dest('./test'));
	    // .pipe(exec(urlList[1],options))
	    // comment out the line below
	    .pipe(exec.reporter(reportOptions));
	});

// 2. Lint the student files
// Create a task that loops through each student repo, lints the students html, css and js and exports a report
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