var $        	= require('gulp-load-plugins')();
var argv     	= require('yargs').argv;
var gulp     	= require('gulp');
var rimraf   	= require('rimraf');
var requireDir 	= require('require-dir');
var router   	= require('front-router');
var sequence 	= require('run-sequence');
var fs 			= require('fs');

///////////////
var shell 	 	= require('gulp-shell');
var GulpSSH 	= require('gulp-ssh');
var exec 		= require('gulp-exec');

// Settings
var site= "https://github.com/";
// Add your student names here
var username = [
	"joselsalazar",
	"Cperez2187",
	"tkappha",
	"Lolobrew",
	"Cperez2187",
	"afflatus480",
	"cqliu1",
	"jeffhatch",
	"peques",
	"wesvanduine"
];

// The naming should be standardized
// Examples:
// weeWeek1_Day2_html_css
var reponame = "Basic-Portfolio";

	// ssh config
	var config = {
	  host: '192.30.252.0', //'192.168.0.21',
	  port: 22,
	  username: 'node',
	  privateKey: fs.readFileSync('/Users/hans/.ssh/id_rsa')
	}

	var gulpSSH = new GulpSSH({
	  ignoreErrors: false,
	  sshConfig: config
	})

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
 
	gulp.task('test', function() {
		return gulp.src('./**/**')
	    .pipe(exec('git clone '+  site + "/HansUXdev/repair-hub", options))
	    // comment out the line below
	    .pipe(exec.reporter(reportOptions));
	});

	// gulp.task('shell', function () {
	//   return gulpSSH
	//     .shell(
	//     	// 'git clone '+  site + "/HansUXdev/repair-hub", {filePath: 'shell.log'})
	//     .pipe(gulp.dest('logs'))
	// })

	gulp.task('clone', shell.task(
		// 'echo Hello, World!'
		"git clone " +  site + "/HansUXdev/repair-hub"
			// for (var i = 0; i < username.length; i++) 
			// {
		    // "git clone " + site + username[i] + "/" + reponame
			// }
	))
	
	gulp.task('example', () => {
	  return gulp.src('*.js', {read: false})
	  .pipe(shell([
	  	'git clone ' +  site + '/HansUXdev/repair-hub'
	    // 'echo <%= file.path %>'
	  ]))
	})

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