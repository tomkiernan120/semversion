const fs = require( 'fs' );

const fileExists = async ( src ) => {
  return fs.existsSync( src ) || false;
} 

const validateOpts = async ( opts ) => {
  if( !opts.src ) {
    throw new Error( 'No file or path set.' );
  }
  
  if( !opts.type ) {
    throw new Error( 'Please specify a patch \'type\'.' );
  }
  
  if( !fileExists(opts.src) ) {
    throw new Error( `The file or path: ${opts.src} specified could not be found.` );
  }
}

module.exports = {
  validateOpts,
  fileExists
};
