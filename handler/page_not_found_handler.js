const DefaultHandler = require('./default_handler.js');

class PageNotFoundHandler extends DefaultHandler {
  constructor() {
    super();
  }
  execute(req, res) {
    res.statusCode = 404;
    res.write('Page Not Found !');
    res.end();
  }
}

module.exports = PageNotFoundHandler;