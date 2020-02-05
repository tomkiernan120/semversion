const fs = require('fs');
const path = require('path');

const asyncWalk = (dir, filter, ignore = ['node_modules', '.dotfiles'], fileList = [] ) => {
  const files = fs.readdirSync(dir);

  for (var i = 0; i < files.length; i++) {
    const file = files[i]
    
    if (ignore.includes(file) || (ignore.includes('.dotfiles') && file.substr(0, 1) === '.') || (filter && filter.match(file))) {
      continue;
    }

    const filePath = path.join(dir, file);
    const fileStat = fs.lstatSync(filePath);


    if (fileStat.isDirectory()) {
      asyncWalk(filePath, filter, ignore, fileList);
    } 
    else {
      fileList.push(filePath);
    }
  }


  return fileList;
}


module.exports = asyncWalk;
