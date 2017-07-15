// var terminalkit = require("terminal-kit");
var fs 					= require("fs");
var inquirer 			= require("inquirer");
var gulp    			= require('gulp');
var fs 					= require('fs');
var exec 				= require('child_process').exec;
var request 			= require("request"); //

//
var site 				= "https://github.com/";
var settings 			= require('./settings.js');
var reponames 			= settings.reponames;
var studentList 		= settings.studentList;
var urlList 			= [];

const debug = false;
const production = true;

	inquirer.prompt([
		// 1. Actions
		// TA's should be able to automatically:
		// A). clone all student repos
		// B). install npm in all repos (if package.json exist)
		// - - - - - - - - - - - - - - -
		    /*
		    */
		    {
		      type: "rawlist",
		      name: "choice",
		      message: "What do you need to do?",
		      choices: [
		      	"Clone student repos", 
		      	"Install npm in repos",
		      	"clone a specific repo from a student"
		      ]
		    },

		// VERSION 2 SPECS
		// 1. Choose the week you are in
		// 2. Clone the repos
		// - - - - - - - - - - - - - - -
	    /*
		    {
		      type: "rawlist",
		      name: "week",
		      message: "Which week are you in do you need to do?",
		      choices: [
				"Week 1",
				"Week 2",
				"Week 3",
				"Week 4",
				"Week 5",
				"Week 6",
				"Week 7",
				"Week 8",
				"Week 9",
				"Week 10",
				"Week 11",
				"Week 12",
				"Week 13",
				"Week 14",
				"Week 15",
				"Week 16",
				"Week 17",
				"Week 18",
				"Week 19",
				"Week 20",
				"Week 21",
				"Week 22",
				"Week 23"
		      ]
		    },
		*/
	])
	.then(function(user){
		// console.log(JSON.stringify(user, null, 2));

		if (user.choice==="Clone student repos") {
			// cloneRepo()
			if (production) {
				testClone()
			}
		}
		if (user.choice==="Install npm in repos") {
			console.log("npm is now installed all projects ! ");
			installNPM()
		}
		if (user.choice==="clone a specific repo from a student") {
			// need to store to arguements
			// cloneRepo()
			console.log("cloned ! ");
		}
	});

// MAIN FUNCTIONS
// - - - - - - - - - - - - - - -
	// 1. Clone all student repos
	// creates a list of all instances, include repos that do not exist...
	// - - - - - - - - - - - - - - -
		function testClone(){
			    reponames.forEach(function(repo) {
			      var list = studentList.map(function(student) {
			      	return `git clone ${site}${student}/${repo} students/${student}/${repo}` 
			      })
			      urlList = urlList.concat(list);
				  command = urlList.join(' && ');
			    })

				exec(command, function (err, stdout, stderr) {
				  // 
					console.log(stdout);
					console.log(stderr);
					// cb(err);
				});
		}

		// VERSION 2
		// function should clone all student projects without an error
		// will iterate through 2 arrays (gitNames,students)
		// cloneRepo('kabrittan', 'Basic-Portfolio')
		// - - - - - - - - - - - - - - -
			function cloneRepo(name,git){
				command= `git clone ${site}${name}/${git} students/${name}/${git}`;
			  exec(command, function (err, stdout, stderr) {
			      console.log(stdout);
			      console.log(stderr);
			  });
			}	
	// 2. Npm install all the student files
	// Create a task that loops through each student repo, runs npm install on for each project
	// - - - - - - - - - - - - - - -
	function installNPM(){
		console.log("RUNNING ...")
	    reponames.forEach(function(reponame) {
	      var list = studentList.map(function(student) {
	      	return `cd students/${student}/${reponame} && npm i || true` 
	      })
	      urlList = urlList.concat(list);
			  command = urlList.join(' && ');
	    })
	    console.log(command)
		exec(command, function (err, stdout, stderr) {
		  console.log(stdout);
		  console.log(stderr);
		});
	}

// HELPER FUNCTIONS
// - - - - - - - - - - - - - - -
	// 1. gitExists
	// Function checks if the git repo already exists
	// * @fs.existsSync - Returns true if the file exists, 
	// * @request - if !404 error, try and clone
	// - - - - - - - - - - - - - - -
	// * TEST * if the folder does not already exist, then clone it
	// gitExists('HansUxDev','TA-Helper'); // should be 202 and should be cloned
	// - - - - - - - - - - - - - - -
	// * TEST * if the folder does exist and there is a repo 
	// gitExists('HansUxDev','taHelper');  // should be 404
	// - - - - - - - - - - - - - - -
	// * TEST * if it works with reponames & studentList = arrays
	// gitExists(reponames, studentList);
	// - - - - - - - - - - - - - - -
	function gitExists(name,git){
		request(`${site}${name}/${git}`,
			function (error, response, body) {
				if (debug) {
				  // Print the response status code
					  console.log(`${site}${name}/${git} statusCode: ${response} ${response.statusCode} `);
				  // Print the error if one occurred 
					  // console.log(`${site}${name}/${git} error: ${error}`); 
				};
				// console.log(`========`)
				// create a list of the repos that don't return a 404
			  if (response && response.statusCode !== 404) {
			  	console.log(`This is a VALID git repo: ${site}${name}/${git} `)
			  	// return `${site}${name}/${git}`;
			  };
		});
	}
	// 2. fileExist
	// Check if there is a package.json file.
	// - - - - - - - - - - - - - - 
	function fileExist(name,git){
	  var folderString    = "students/"+
	    name+'/'+   //  "heythisispaul/"+
	    git+ '/'+   //  "bamazon/"+
	    "package.json";

	  if(fs.existsSync(folderString)) {
	    // if(callback) {callback();}
	    // return;
	    // npmInstall();
	    console.log('File Exists')
	  }
	  else if (!fs.existsSync(folderString)){
	    console.log("file does not exist")
	  }
	}







