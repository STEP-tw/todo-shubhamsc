let chai = require('chai');
let assert = chai.assert;
let app = require('../server/app.js');
let request = require('./testSetup.js');
let th = require('./testHelper.js');

describe('appTest',()=>{
  describe('GET /badFile',()=>{
    it('should be show page not found Error',(done)=>{
      request(app,{method:'GET',url:'/badFile'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
     })
  })
  
})