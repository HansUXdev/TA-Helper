var fs = require("fs");
var inquirer = require("inquirer");
// var terminalkit = require("terminal-kit");
var gulp     	= require('gulp');
var fs 			= require('fs');
var exec 		= require('child_process').exec;


var site 		= "https://github.com/";
var settings 	= require('./settings.js');
var reponames 	= settings.reponames;
var studentList = settings.studentList;
var urlList 	= [];



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
    },
	// {
	// 	type: "input",
	// 	message: "What is your name?",
	// 	name: "name"
	// },
])
.then(function(user){
	// console.log(JSON.stringify(user, null, 2));

	if (user.choice==="Clone student repos") {cloneRepo()}
	if (user.choices==="Install npm in repos") {
		console.log("npm is now installed all projects ! ");
	}
	if (user.choices==="clone a specific repo from a student") {
		console.log("cloned ! ");
	}
});


function cloneRepo(){
    // console.log("All student repos have been cloned ! ");
    reponames.forEach(function(reponame) {
      var list = studentList.map(function(student) {
          return ' git clone ' + site + student +'/'+ reponame 
            + ' students/' + student +'/'+  reponame 
            + ' || true'; 
      })
      urlList = urlList.concat(list);
 	  command = urlList.join(' && ');
    })

    // console.log('\n',command);

  exec(command, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      // cb(err);
  });
}
cloneRepo();



/*
  inquirer.prompt([
    {
      type: "rawlist",
      name: "choice",
      message: "What would you like to do?",
      choices: ["Add New Item", "Add Quantity to Existing Items"]
    }
  ]).then(function(val) {
    if (val.choice === "Add New Item") {
      addItem();
    }
    if (val.choice === "Add Quantity to Existing Items") {
      addQuantity();
    }
  });
*/ 