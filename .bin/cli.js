#! /usr/bin/env node

const figlet = require('figlet');
const chalk = require('chalk');
const commandLineArgs = require('command-line-args');
const inquirer = require('inquirer');
const isValid = require('is-valid-path');
const minimist = require( 'minimist' );
const fs = require('fs');
const path = require('path');
const currentDirectory = process.cwd();

const semverRegex = require('../helpers/semver-regex');

const argv = minimist( process.argv.slice(2) );

let checkFiles = [ 'package.json' ];
checkFiles = [];

let ignore= [ 'node_modules' ];

let filesToProcess = [];
let type = false;

if( argv._.length ) { // if file paths are defined check if they have semver;
  
}
else { // check type
  
  checkFiles.forEach( function( val ) { // currently finds the last if they all exist
     if( fs.existsSync( path.join( currentDirectory, val ) ) ) {
      type = val;
    }
  });
  
  if( !type ) { // search directory
    const asyncWalk = require( '../helpers/asyncwalk' );
    
    let files = asyncWalk( currentDirectory );
    
    console.log(files );
    
  }
  
}
