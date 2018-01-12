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

const body_does_not_contain = (res,text)=> {
  assert.isNotOk(res.body.includes(text),`missing ${text}`);
}

const should_not_have_cookie = (res,name)=> {
  let cookieText = res.headers['Set-Cookie']||'';
  assert.notInclude(cookieText,`${name}=`);
};
const should_have_cookie = (res,name,value)=> {
  console.log(res.headers);
  let cookieText = res.headers['Set-Cookie'];
  assert.include(cookieText,`${name}=${value}`);
};
const should_have_expiring_cookie = (res,name,value)=> {
  console.log(res.headers);
  let cookieText = res.headers['Set-Cookie'];
  assert.include(cookieText,`${name}=${value}`);
};

const should_be_redirected_to = (res,location)=>{
  assert.equal(res.statusCode,302);
  assert.equal(res.headers.location,location);
};



exports.statusIsOk=statusIsOk;
exports.contentTypeIs=contentTypeIs;
exports.body_contains=body_contains;
exports.should_not_have_cookie = should_not_have_cookie;
exports.should_have_cookie = should_have_cookie;
exports.should_have_expiring_cookie = should_have_expiring_cookie;
exports.body_does_not_contain = body_does_not_contain;
exports.should_be_redirected_to = should_be_redirected_to;