
var username = ["Cperez2187","World"];
var reponame = "this";
var site= "https://github.com/";



// gulp.task('clone', () => {
//   return gulp.src('*.js', {read: false})
//   .pipe(shell([
//     'echo <%= file.path %>'
//   ]))
// })
// gulp.task('greet', shell.task('echo Hello, World!'))



// // Loop through a list of users and clone each repo
// for (var i = 0; i 
// 	< username.length; 
// 	i++) 
// {
//   // "git clone " + /"https://github.com/" + username + "/" + reponame
//     console.log(
//    "git clone " + site + username[i] + "/" + reponame
//     );
// }


// 1. LIBRARIES
// - - - - - - - - - - - - - - -

var $        = require('gulp-load-plugins')();
var shell 	 = require('gulp-shell');
var argv     = require('yargs').argv;
var gulp     = require('gulp');
var rimraf   = require('rimraf');
var requireDir = require('require-dir');
var router   = require('front-router');
var sequence = require('run-sequence');

// Check for --production flag
var isProduction = !!(argv.production);

// 2. FILE PATHS
// - - - - - - - - - - - - - - -

var paths = {
  assets: [
    './client/**/*.*',
    '!./client/templates/**/*.*',
    '!./client/assets/{scss,js}/**/*.*'
  ]
}

// 3. TASKS
// - - - - - - - - - - - - - - -

// Cleans the build directory
gulp.task('clean', function(cb) {
  rimraf('./build', cb);
});





// for (var i = 0; i < username.length; i++) 
// {
	gulp.task('clone', shell.task(
		// 'echo Hello, World!'
		"git clone https://github.com/HansUXdev/TA-Helper"
		   // "git clone " + site + username[i] + "/" + reponame

	))
// }
// gulp.task('example', () => {
//   return gulp.src('*.js', {read: false})
//   .pipe(shell([
//     'echo <%= file.path %>'
//   ]))
// })



// Starts a test server, which you can view at http://localhost:8079
gulp.task('server', ['build'], function() {
  gulp.src('./build')
    .pipe($.webserver({
      port: 8079,
      host: 'localhost',
      fallback: 'index.html',
      livereload: true,
      open: true
    }))
  ;
});



// Default task: builds your app, starts a server, and recompiles assets when they change
gulp.task('default', ['server'], function () {
  
  // gulp.watch(['./client/**/*.*', '!./client/templates/**/*.*', '!./client/assets/{scss,js}/**/*.*'], ['copy']);

});