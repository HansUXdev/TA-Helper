// var terminalkit = require("terminal-kit");
var fs 						= require("fs");
var inquirer 			= require("inquirer");
var gulp    			= require('gulp');
var fs 						= require('fs');
var exec 					= require('child_process').exec;
var request 			= require("request"); //

//
var site 					= "https://github.com/";
var settings 			= require('./settings.js');
var reponames 		= settings.reponames;
var studentList 	= settings.studentList;
var urlList 			= [];

const debug = false;
const production = false;

if (production) {

	inquirer.prompt([
		// Which part of the course is the TA in?
	    {
	      type: "rawlist",
	      name: "choice",
	      message: "What do you need to do?",
	      choices: [
	      	"Clone student repos", 
	      	"Install npm in repos",
	      	"clone a specific repo from a student"
	      ]
	    }
	])
	.then(function(user){
		// console.log(JSON.stringify(user, null, 2));

		if (user.choice==="Clone student repos") {
			cloneRepo()
		}
		if (user.choices==="Install npm in repos") {
			console.log("npm is now installed all projects ! ");
		}
		if (user.choices==="clone a specific repo from a student") {
			// need to store to arguements
			// cloneRepo()
			console.log("cloned ! ");
		}
	});

};


// function should clone all student projects without an error
// will iterate through 2 arrays (gitNames,students)
// cloneRepo('kabrittan', 'Basic-Portfolio')
	function cloneRepo(name,git){
		command= `git clone ${site}${name}/${git} students/${name}/${git}`;
	  exec(command, function (err, stdout, stderr) {
	      console.log(stdout);
	      console.log(stderr);
	  });
	}


/////
// function checks if the git repo already exists
// * @fs.existsSync - Returns true if the file exists, 
// * @request - if !404 error, try and clone
// * if the folder does not already exist, then clone it
// * if the folder does exist and there is a repo 
gitExists('kabrittan','Basic-Portfolio'); // should be 202 and should be cloned
gitExists('azcactus','Basic-Portfolio');  // should be 404
// gitExists(reponames, studentList);
/////
// console.log()

function gitExists(name,git){
	// console.log("======= git exist =======");

		request(`${site}${name}/${git}`,
			// 'https://github.com/zurb/building-blocks/', 
			function (error, response, body) {
				if (!debug) {
				  // Print the response status code
					  console.log(`${site}${name}/${git} statusCode: ${response} ${response.statusCode} `);
				  // Print the error if one occurred 
					  // console.log(`${site}${name}/${git} error: ${error}`); 
				};
				// console.log(`========`)

				// create a list of the repos that don't return a 404
			  if (response && response.statusCode !== 404) {
			  	console.log(`This is a VALID git repo: ${site}${name}/${git} `)
			  	return `${site}${name}/${git}`;
			  };
		});
}



/////
// function should clone all student projects without an error
// will iterate through 2 arrays (gitNames,students)
// cloneRepo('kabrittan', 'Basic-Portfolio')
// cloneAll(reponames, studentList);

function cloneAll(gitNames,students){
	console.log("======= CLONE ALL =======");
	// creates a list of all instances, include repos that do not exist...
	    gitNames.forEach(function(repo) {
	      var list = studentList.map(function(student) {
	      	// console.log(gitExists(student,repo))
	      	// call the clone function
	      	return `${cloneRepo(student,repo)}`
	      })
	      urlList = urlList.concat(list);
	    })
			command = urlList.join(' && ');
			
	    // console.log('The array:\n',urlList);
	    // console.log('The finished command:\n',command);
		  // exec(command, function (err, stdout, stderr) {
		  // 	  // 
		  //     console.log(stdout);
		  //     console.log(stderr);
		  //     // cb(err);
		  // });
	console.log("=========================");
}

function installNPM(){
    reponames.forEach(function(reponame) {
      var list = studentList.map(function(student) {
      	// git clone https://github.com/kabrittan/Basic-Portfolio students/kabrittan/Basic-Portfolio || true
      	return `cd ${student}/${reponame} npm i || true` 
      })
      // console.log(`LIST:
      // 	${list}
      // `);
      urlList = urlList.concat(list);
		  command = urlList.join(' && ');
    })

    console.log('\n',command);
}
// installNPM();



/////
// Foundation CLI example
// function changes the Scss file
// * fs.existsSync - Returns true if the file exists, 
// * 
/////
/*

function updateAppSCSS(name, callback) {
  var scssString    = "src/assets/scss/components/building-blocks/_" + name + ".scss";

  if(!fs.existsSync(scssString)) {
    if(callback) {callback();}
    return;
  }
  fs.readFile('src/assets/scss/app.scss', {}, function(err, content) {
    line = "@import 'components/building-blocks/" + name + "';"
    if(content.indexOf(line) === -1) {
      content = content + "\n" + line;
    }
    fs.writeFile('src/assets/scss/app.scss', content, callback);
  });
};

*/ 


