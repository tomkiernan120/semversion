const fs = require( 'fs' ); 
const path = require( 'path' ); 
const dictionary = require( './helpers/dictionary' );

module.exports.run = async function( context, plugin ) { // XXX can choose to extend with plugins
  const { cwd, type, versioning } = context;
  
  let isFilePath = fs.fileExistSync( type ) || false;
  
  if( type ) {
    
    let filePath;
    
    if( isFilePath ) {
      filePath = type;
    }
    else {
      filePath = path.join( cwd, type );
    }
    
    const file = fs.read( filepath );
    
    console.log( file ); 
    
  }
  
};
