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
const dictionary = require( '../helpers/dictionary' );
const { run } = require( '../' );

const argv = minimist( process.argv.slice(2) );

let checkFiles = [ 'package.json' ];

let ignore = [ 'node_modules', '.dotfiles' ];

let type = false;
let file;

let version = 'patch';

if( argv.v || argv.version ) {

  if( Object.keys( dictionary ).includes( argv.v ) ) {
    version = argv.v;
  }
  else if( Object.keys( dictionary ).includes( argv.version ) ) {
    version = argv.version;
  }
  else {
    throw new Error( `unknown version` );
  }
}

if( argv._.length ) { // if file paths are defined check if they have semver;
  
  console.log( argv );
  
}
else { // check type
  
  checkFiles.forEach( function( val ) { // currently finds the last if they all exist
     if( fs.existsSync( path.join( currentDirectory, val ) ) ) {
      file = val;
    }
  });
  
  if( !type ) { // search directory
    const asyncWalk = require( '../helpers/asyncwalk' );
    
    let files = asyncWalk( currentDirectory, null, ignore );
    
    file = files.filter( x => {
      return checkFiles.includes( path.basename(x).toLowerCase() )
    });
    
    if( file ) {
      file = file[0];
    }
  }
  
  run({ cwd: process.cwd(), file, versioning: version, fileType: checkFiles[ checkFiles.indexOf( path.basename( file ) ) ] });
}
