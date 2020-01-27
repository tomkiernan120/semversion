const fs = require('fs');

const getFileContents = async ( src ) => {
   let fileData = fs.readFileSync( src );
   
   console.log( fileData )

   if( fileData && Buffer.isBuffer( fileData ) ) {
     console.log( 'return string' );
     return fileData.toString();
   }
   else {
     console.log( 'return object' );
     return fileData;
   }
}


module.exports = {
  getFileContents,
};
