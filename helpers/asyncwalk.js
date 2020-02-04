const fs = require('fs');
const path = require('path');

const asyncWalk = async ( dir, ignore = [ 'node_modules', '.dotfiles' ], filter, fileList = [] ) => {
  const files = fs.readdirSync( dir );
  
  files.forEach( (file) => {
    
    console.log( file );
    
    const filePath = path.join( dir, file );
    const fileStat = fs.lstatSync(filePath);
    
    if( fileStat.isDirectory() ) {
      asyncWalk( filePath, ignore, filter );
    }
    else if( filter && filter.test( filePath ) ) {
      fileList.push( filePath )
    }
    else if( !filter ) {
      fileList.push( filePath );
    }
    
  });
  
  return fileList;
}


module.exports = asyncWalk;
