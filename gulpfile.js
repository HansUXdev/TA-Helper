var gulp     	= require('gulp');
var fs 			= require('fs');
// var exec 		= require('gulp-exec');
var exec 		= require('child_process').exec;
 

// Settings
  var options = {
    continueOnError: false, // default = false, true means don't emit error event 
    pipeStdout: false, // default = false, true means stdout is written to file.contents 
    customTemplatingThing: "test" // content passed to gutil.template() 
  };
  var reportOptions = {
    err: false, // default = true, false means don't write err 
    stderr: true, // default = true, false means don't write stderr 
    stdout: true // default = true, false means don't write stdout 
  }
var site 		= "https://github.com/";
var settings 	= require('./settings.js');
var reponames 	= settings.reponames;
var studentList = settings.studentList;
var urlList 	= [];




// git clone https://github.com/azcactus/Trivia-Game.git azcactus/Trivia_Game

// 1. Clone repos
// Create a task that loops through a list of users and clone each repo in a "build folder"
// - - - - - - - - - - - - - - 
    
    // urlList.concat(['', 'asdasdad'])
    reponames.forEach(function(reponame) {
      var list = studentList.map(function(student) {
          // return 'cd students/' + student +'/'
          //   + ' || true '
          //   +'&& git clone ' 
          //   + site + student +'/'+ reponame 
          //   // + ' Students/' + student +'/'+  reponame 
          //   + ' || true'; 
          return ' git clone ' + site + student +'/'+ reponame 
            + ' students/' + student +'/'+  reponame 
            + ' || true'; 
      })
      urlList = urlList.concat(list);
    })

    var command = urlList.join(' && ');

gulp.task('default', function (cb) {
  exec(command, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
  });
})



// 2. Npm install all the student files
// Create a task that loops through each student repo, runs npm install on for each project
// - - - - - - - - - - - - - - -
/*
    reponames.forEach(function(reponame) {
      var commandInstall = studentList.map(function(student) {
          return ' cd ' + student +'/'+ reponame + ' npm i'
            // + ' && ' + ' || true'; 
      })
      urlList = urlList.concat(commandInstall);
    })
    var install = urlList.join(' && ');
    console.log(install);
*/ 

gulp.task('install', function (cb) {
    exec(install, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
  });
})




// 3. Server
// Create a task to open up each students project in a new tab
// - - - - - - - - - - - - - - -

    // Starts a test server, which you can view at http://localhost:8079
//     gulp.task('server', ['build'], function() {
//         // for (var i = 0; i < username.length; i++)
//         gulp.src('./build')
//         .pipe($.webserver({
//             port: 8079,
//             host: 'localhost',
//             fallback: 'index.html',
//             livereload: true,
//             open: true
//         }))
//         ;
//         // }
//     });



// // Default task: builds your app, starts a server, and recompiles assets when they change
// gulp.task('default', ['server'], function () {
  
//   // gulp.watch(['./client/**/*.*', '!./client/templates/**/*.*', '!./client/assets/{scss,js}/**/*.*'], ['copy']);

// });


