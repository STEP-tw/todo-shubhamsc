let chai = require('chai');
let assert = chai.assert;
let app = require('../server/app.js');
let request = require('./testSetup.js');
let th = require('./testHelper.js');

describe('appTest',()=>{  
  describe('GET /badFile',()=>{
    it('should give page not found Error when user is not logged in',done=>{
      request(app,{method:'GET',url:'/badFile'},res=>{
        assert.equal(res.statusCode,404);
        done();
      })
    })
    it('should give page not found Error when user is logged in',done=>{
      request(app,{method:'GET',url:'/badFile',headers:{'cookie':'sessionId=1234'}},res=>{
        assert.equal(res.statusCode,404);
        done();
      })
    })
  })
  describe('GET /',()=>{
    it('should serve login page',done=>{
      request(app,{method:'GET',url:'/'},res=>{
        th.statusIsOk(res);        
        th.body_contains(res,'Login');        
        done();
      })  
    })
    it('should send to home page when user is logged in',done=>{
      request(app,{method:'GET',url:'/',user:"shubham"},res=>{
        th.should_be_redirected_to(res,'/home');     
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
    it('serves the login page without message',done=>{
      request(app,{method:'GET',url:'/login'},res=>{
        th.statusIsOk(res);
        th.body_contains(res,'Name:');
        th.body_does_not_contain(res,'Invalid user or password');
        th.should_not_have_cookie(res,'error=');
        done();
      })
    })
    it('serves the login page with message for a failed login',done=>{
      request(app,{method:'GET',url:'/login',headers:{'cookie':'error=Invalid user or password'}},res=>{
        th.statusIsOk(res);
        th.body_contains(res,'Name:');
        th.body_contains(res,'Invalid user or password');
        th.should_not_have_cookie(res,'error=');
        done();
      })
    })
    it('serves home page when user already logged in',done=>{
      request(app,{method:'GET',url:'/login',user:'shubham'},res=>{
        th.should_be_redirected_to(res,'/home');
        done();
      })
    })
  })
  describe('POST /login',()=>{
    it('redirects to home for valid user',done=>{
      request(app,{method:'POST',url:'/login',user:'shubham'},res=>{
        th.should_be_redirected_to(res,'/home');
        done();
      })
    })
    it('redirects to login with message for invalid user',done=>{
      request(app,{method:'POST',url:'/login',body:{'error':'Invalid user or password'}},res=>{
        th.should_be_redirected_to(res,'/login');
        th.should_have_expiring_cookie(res,'error','Invalid user or password');
        done();
      })
    })
  })
  describe('GET /logout',()=>{
    it('should close the session and redirect to login',done=>{
      request(app,{method:'GET',url:'/logout'},res=>{
        th.should_be_redirected_to(res,'/login');
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
    it('should display home page when user logged in',done=>{
      request(app,{method:'GET',url:'/home',user:'shubham',headers:{'cookie':'userName=shubham'}},res=>{
        th.statusIsOk(res);
        th.body_contains(res,'shubham');
        done();
      })
    })
  })
  describe('GET /createTodo',()=>{
    it('should show form to add new TODO if user is logged in',done=>{
      request(app,{method:'GET',url:'/createTodo',user:'shubham'},res=>{
        th.statusIsOk(res);
        th.body_contains(res,'Create TODO');
        done();
      })
    })
    it('should redirect to add item for Todo',done=>{
      request(app,{method:'POST',url:'/create'},res=>{
        th.should_be_redirected_to(res,'/items')        
        done();
      })
    })
    it('should redirect to login if user is not logged in',done=>{
      request(app,{method:'GET',url:'/createTodo'},res=>{
        th.should_be_redirected_to(res,'/login')        
        done();
      })
    })
  })
  describe('GET /todoItems',()=>{
    it('should show todo items when user is looged in',done=>{
      request(app,{method:'GET',url:'/items',user:'shubham'},res=>{
        th.statusIsOk(res);
        th.body_contains(res,'Add Items');       
        done();
      })
    })
    it('should redirect to login when user is not looged in',done=>{
      request(app,{method:'GET',url:'/items'},res=>{
        th.should_be_redirected_to(res,'/login');
        done();
      })
    })
  })
})