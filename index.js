const fs = require( 'fs' ); 
const path = require( 'path' ); 
const dictionary = require( './helpers/dictionary' );

module.exports.run = async function( context, plugin ) { // XXX can choose to extend with plugins
  const { cwd, file, versioning, fileType } = context;
  
  let isFilePath = fs.lstatSync( file ).isFile() || false;
    
  if( file ) {
    
    let filePath;
    
    if( isFilePath ) {
      filePath = file;
    }
    else {
      filePath = path.join( cwd, file );
    }
    
    fs.readFile( filePath, (err, data) => {
      if( err ) {
        throw new Error( err );
      }
      
      let string = data.toString();
      
      let versionString = module.exports.getVersionString( fileType, string ); 
      
      if( versionString[0] ) { // full match
        
        let stringToReplace = versionString[0];
        let stringSemver = stringToReplace.replace( /[^.\d]/gm, '' );
        let versionNums = [ versionString[2], versionString[3], versionString[4] ];
        
        let newSemver = module.exports.bumpVersion( versioning, versionNums );
        
        if( newSemver.length ) {
          
          string = string.replace( stringToReplace, stringToReplace.replace( stringSemver, newSemver.join( '.' ) ) );
          
          fs.writeFile( filePath, string, (err) => {
            if( err ){
              throw err;
            }
            console.log( `version updated in: ${filePath}` );
          });
        }
      }
    });
  }
};

module.exports.bumpVersion = function( versioning, semver ) {
  let newSemver = semver;
    
  if( Object.keys( dictionary ).includes( versioning ) ) { // need to work out how to do nested versionings
    const versionKey = dictionary[ versioning ];
    if ( versionKey ) { 
      newSemver[ versionKey ]++;
    }
  }
  
  return newSemver;
}

module.exports.getVersionString = function( fileType, file ) {
  let regex;
  if( fileType ) {
    
    regex = require( './helpers/semver-regex' );
    
    if( fileType === 'package.json' ) {
      regex = /(version": "(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)/gm;
    }
    
  }
  return regex.exec( file );
};
