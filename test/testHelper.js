let chai = require('chai');
let assert = chai.assert;

const statusIsOk = (res)=>{
  assert.equal(res.statusCode,200);
}

const contentTypeIs = (res,expected)=>{
  assert.equal(res.headers['Content-Type'],expected);
}

const body_contains = (res,text)=> {
  assert.isOk(res.body.includes(text),text);
}


exports.statusIsOk=statusIsOk;
exports.contentTypeIs=contentTypeIs;
exports.body_contains=body_contains;