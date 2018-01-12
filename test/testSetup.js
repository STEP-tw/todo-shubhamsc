let eventEmiter = require('events');
let request = function(app,option,execute){
  let resHeaders = {};
  let resContents = '';
  let req = new eventEmiter();
  req.headers = option.headers || {};
  req.method = option.method;
  req.url = option.url;
  let res = {
    end:()=>{
      req.finished = true;
      let result ={
        statusCode:res.statusCode||200,
        body:resContents,
        headers:resHeaders
      }
      execute(result);
    },
    setHeader:(key,value)=>resHeaders[key]=value,
    write:(text)=>resContents += text
  }
  app(req,res);
  req.body && req.emit('data',option.body);
  req.emit('end');
};

module.exports = request;