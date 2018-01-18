const fs = require('fs');
const DefaultHandler = require('./default_handler.js');
const Time = require('../commonLib/time_stamp.js');
const getToString = require('../commonLib/lib.js').getToString;

class LoggerHandler extends DefaultHandler {
  constructor() {
    super();
  }
  execute(req, res) {
    let timeStamp = new Time().getTimeStamp();
    let log = ['------------------------------',
      `${timeStamp}`,
      `${req.method} ${req.url}`,
      `HEADERS: ${getToString(req.headers)}`,
      `COOKIES: ${getToString(req.cookie)}`,
      `BODY: ${getToString(req.body)}`, ''
    ].join('\n');
    fs.appendFile('../request.log', log, (err) => {});
  }
}

module.exports = LoggerHandler;