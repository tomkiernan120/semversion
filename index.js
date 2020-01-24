const fs = require( 'fs' );
const semver = require('semver');
const versionRegex = /(\d+\.\d+\.\d+)/gm;


module.exports = function( options ) {
  
}

// let fileData, m;
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
