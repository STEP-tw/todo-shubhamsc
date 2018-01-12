let chai = require('chai');
let assert = chai.assert;
let app = require('../server/app.js');
let request = require('./testSetup.js');
let th = require('./testHelper.js');

describe('appTest',()=>{
  describe('GET /badFile',()=>{
    it('should be show page not found Error',done=>{
      request(app,{method:'GET',url:'/badFile'},res=>{
        assert.equal(res.statusCode,404);
        done();
      })
     })
  })
  describe('GET /login',()=>{
    it('should show login page of app',done=>{
      request(app,{method:'GET',url:'/login'},res=>{
        th.statusIsOk(res);
        th.contentTypeIs(res,'text/html');
        th.body_contains(res,'Login');
        done();
      })
    })
    it('serves the login page',done=>{
      request(app,{method:'GET',url:'/login'},res=>{
        th.statusIsOk(res);
        th.body_contains(res,'Name:');
        th.body_does_not_contain(res,'Invalid user or password');
        th.should_not_have_cookie(res,'error');
        done();
      })
    })
    it('serves the login page with message for a failed login',done=>{
      request(app,{method:'GET',url:'/login',headers:{'cookie':'error=Invalid user or password'}},res=>{
        th.statusIsOk(res);
        th.body_contains(res,'Name:');
        th.body_contains(res,'Invalid user or password');
        th.should_not_have_cookie(res,'error');
        done();
      })
    })
  })
  describe('POST /login',()=>{
    it.skip('redirects to home for valid user',done=>{
      request(app,{method:'POST',url:'/login',body:'userName=shubham'},res=>{
        th.should_be_redirected_to(res,'/home');
        done();
      })
    })
    it('redirects to login with message for invalid user',done=>{
      request(app,{method:'POST',url:'/login',body:'username=badUser'},res=>{
        th.should_be_redirected_to(res,'/login');
        th.should_have_expiring_cookie(res,'error','Invalid user or password');
        done();
      })
    })
  })
  describe('GET /home',()=>{
    it('should redirect to login when user is not logged in',done=>{
      request(app,{method:'GET',url:'/home'},(res)=>{
        th.should_be_redirected_to(res,'/login')
        done();
      })
    })
    it.skip('should display home page when user logged in',done=>{
      request(app,{method:'GET',url:'/home',headers:{'cookie':'userName=shubham'}},res=>{
        th.statusIsOk(res);
        th.body_contains(res,'shubham');
        th.should_have_cookie(res,'userName');
        done();
      })
    })
  })
  describe('GET /createTodo',()=>{
    it('should show form to add new TODO',done=>{
      request(app,{method:'GET',url:'/createTodo'},res=>{
        th.statusIsOk(res);
        th.body_contains(res,'Create TODO');
        done();
      })
    })
  })
})