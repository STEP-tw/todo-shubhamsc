const fs = require('fs');
const DefaultHandler = require('./default_handler.js');
const getTypes = require('../commonLib/lib.js').getTypes;
const writeContents = require('../commonLib/lib.js').writeContents;


const getExtn = function (url) {
  let extn = url.split('.').pop();
  if (extn == url) {
    return 'html';
  }
  return extn;
}

const getFilePath = function (url, extn) {
  let filePath = `./public${url}`;
  if (extn == 'html') {
    return `${filePath}.html`;
  }
  return filePath;
}

class FileHandler extends DefaultHandler {
  constructor(path) {
    super();
  }
  execute(req, res) {
    if (req.url == '/login') return;
    let extn = getExtn(req.url);
    let filePath = getFilePath(req.url, extn)
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      let type = getTypes(extn);
      let userName = req.cookie.userName || '';
      data = data.toString().replace(/USER_NAME/, userName);
      writeContents(req, res, data, type);
    })
  }
}

module.exports = FileHandler;