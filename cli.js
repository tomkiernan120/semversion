#! /usr/bin/env node

const figlet = require('figlet');
const chalk = require('chalk');
const commandLineArgs = require('command-line-args');
const inquirer = require('inquirer');
const isValid = require('is-valid-path');


const optionDefinitions = [
  { name: 'verbose', alias: 'v', type: Boolean, defaultValue: false },
  { name: 'interactive', alias: 'i', type: Boolean, defaultValue: false },
  { name: 'src', type: String, multiple: true },
  { name: 'type', alias: 't', type: String }
];

let options = commandLineArgs(optionDefinitions);

console.log(
  chalk.red(
    figlet.textSync( 'semversion', { horizontalLayout: 'full' } )
  )
);

async function handleBumpSemVer() {
  require('./')(options);
}

async function getOptions() {
  options = await inquirer.prompt([
   {
     name: 'src',
     type: 'input',
     message: 'Please enter the file path of the file you wish to bump the version of: ',
     validate: function(  value ) {
       if( value.length && isValid( value ) ) {
         return true;
       }
       else {
         return 'Please enter a filepath';
       }
     }
   },
   {
     name: 'type',
     type: 'list',
     message: 'Patch type',
     choices: [ 'Major', 'Minor', 'Patch' ],
     default: 'Patch'
   }
 ])
 .then(answers => {
   if( options ) {
     return {...options, ...answers};
   }
   // Use user feedback for... whatever!!
 })
 .catch( err => console.log( err ) );
 await handleBumpSemVer();
}

if( options.interactive ) {
  getOptions();
}
else {
  handleBumpSemVer();
}
