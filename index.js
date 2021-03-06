const semver = require('semver');
const versionRegex = /(\d+\.\d+\.\d+)/gm;

const { validateOpts, fileExists } = require('./libs/validate');
const { getFileContents } = require('./libs/file');

module.exports = function( options ) {
  
  let fileData, m;
  
  validateOpts( options );
  
  try{

    fileData = getFileContents( options.src );
    
    if( fileData ) {
      
        console.log( typeof fileData );
      
        while( (m = versionRegex.exec( fileData )) !== null ) {
      
          // this is necessary to avoid infinite loops with zero-width matches
          if( m.index === versionRegex.lastIndex ) {
            versionRegex.lastIndex++;
          }

          console.log( m );

          // m.forEach((match, groupIndex) => {
          //   // console.log(`Found match, group ${groupIndex}: ${match}`);
          // });
      

      
          if( m[1]  ) {
            
            let version = m[1]
            
            if( Array.isArray( version ) ) {
              version = version[0];
            }
            
                console.log( version );
          
            let oldVersion = semver.clean( version );
            let newVersion = oldVersion.split('.').map((val) => parseInt( val ) );
      
            if( newVersion && newVersion.length === 3 ) {
              
              console.log( options.type )
              
              switch (options.type.toLowerCase()) {
                case 'major':
                  newVersion[0] = ++newVersion[0];
                  break;
                case 'minor':
                  newVersion[1] = ++newVersion[1];
                  break;
                case 'patch':
                  newVersion[2] = ++newVersion[2];
                  break;
                default:
                  throw new Error( `Could not determine patch type: ${options.type}` );

              }
      
              console.log( 'about to write to file' );
              console.log( newVersion );
      
              newVersion = newVersion.join('.');
              fileData = fileData.replace( oldVersion, newVersion );
              console.log( 'just before write to file' );
      
              fs.writeFileSync( options.src, fileData );
              console.log( 'written to file' );
            }
      
          }
          
          break;
        }
      
    }
    
    
  }
  catch(err) {
    console.log( err );
    if( process ) {
      process.exit();
    }
  }
  
  
}


// 
// fileData = fs.readFileSync( './package.json' );
// 
// if( fileData ) {
// 
//   fileData = fileData.toString();
// 
//   while( (m = versionRegex.exec( fileData )) !== null ) {
// 
//     // this is necessary to avoid infinite loops with zero-width matches
//     if( m.index === versionRegex.lastIndex ) {
//       versionRegex.lastIndex++;
//     }
// 
//     m.forEach((match, groupIndex) => {
//       console.log(`Found match, group ${groupIndex}: ${match}`);
//     });
// 
//     if( m[1] ) {
// 
//       let oldVersion = semver.clean( m[1] );
//       let newVersion = oldVersion.split('.').map((val) => parseInt( val ) );
// 
//       if( newVersion && newVersion.length === 3 ) {
// 
//         newVersion[2]++;
// 
// 
//         newVersion = newVersion.join('.');
//         fileData = fileData.replace( oldVersion, newVersion );
// 
//         fs.writeFileSync( './package.json', fileData );
//       }
// 
//     }
// 
//   }
// 
// 
// 
// 
// }
