let chai = require('chai');
let assert = chai.assert;
let app = require('../server/app.js');
let request = require('./testSetup.js');
let th = require('./testHelper.js');

describe('appTest',()=>{
  describe('GET /badFile',()=>{
    it('should be show page not found Error',done=>{
      request(app,{method:'GET',url:'/badFile'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
     })
  })
  describe('GET /login',()=>{
    it('should show login page of app',done=>{
      request(app,{method:'GET',url:'/login'},(res)=>{
        th.statusIsOk(res);
        th.contentTypeIs(res,'text/html');
        th.body_contains(res,'Login');
        done();
      })
    })
  })
})