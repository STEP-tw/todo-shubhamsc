const fs = require('fs');
const TodoHandler = require('../todoList/todoHandler.js')
const writeContents = require('../commonLib/lib.js').writeContents;

let registeredUsers = [{userName: 'shubham',password: 1234},{userName:"singh",password:"123"}];

const loadUser = function (req, res) {
  let sessionId = req.cookie.sessionId;
  let user = registeredUsers.find(regUser => regUser.sessionId == sessionId);
  if (sessionId && user) {
    req.user = user;
  }
};

const checkForAlreadyLoggedIn = function (req, res) {
  if(req.url == '/' && req.user){
    res.redirect('/home');
  }
  if(req.url == '/' && !req.user)
  req.url = '/login';
};

const loginUserSendToHome = function (req, res) {
  if (req.url=='/login' && req.user){
    res.redirect('/home');
  }
};

const logoutUserSendToLogin = function (req, res) {
  if (['/home','/items','/createTodo'].includes(req.url) && !req.user) {
    res.redirect('/login');
  }
};

const getLogin = function (req, res) {
  let error = req.cookie.error || '';
  if (error)
    res.setHeader('Set-Cookie', `error=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`)
  fs.readFile('./public/login.html', 'utf8', (err, data) => {
    if (err){
      console.log(err);
      return;
    } 
    let loginData = data.replace(/LOGIN_ERROR/, error);
    writeContents(req, res, loginData);
  });
};

const getValidUser = function (req, res) {
  return registeredUsers.find(function (regUser) {
    return regUser.userName == req.body.name && regUser.password == req.body.password;
  });
};

const showLoginFailed = function (res) {
  res.setHeader('Set-Cookie', `error=Invalid user or password`);
  res.redirect('/login');
};

const postLogin = function (req, res) {
  let user = getValidUser(req, res);
  if (!user) {
    showLoginFailed(res);
    return;
  }
  let sessionId = new Date().getTime();
  res.setHeader('Set-Cookie', [`sessionId=${sessionId}`, `userName=${user.userName}`]);
  user.sessionId = sessionId;
  todoHandler = new TodoHandler(user.userName);
  todoHandler.getUserData(); 
  todoHandler.showUserTodo();
  res.redirect('/home');
};

const getLogout = function (req, res) {
  res.setHeader('Set-Cookie', [`sessionId=0; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`,
    `userName=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
  ]);
  res.redirect('/login')
};

const ignorePage = function (req, res) {
  res.end();
};

const viewTodo = function(req,res){
  res.write('Not yet implement');
  res.end();
};

const addTodo = function(req,res){
  let todo = req.body || {};
  let user = req.cookie.userName;
  todoHandler.addNewTodo(todo);
  todoHandler.showUserTodo();
  res.redirect('/home');
  // res.end();
}

exports.loadUser = loadUser;
exports.checkForAlreadyLoggedIn = checkForAlreadyLoggedIn;
exports.loginUserSendToHome = loginUserSendToHome;
exports.logoutUserSendToLogin = logoutUserSendToLogin;
exports.getLogin = getLogin;
exports.postLogin = postLogin;
exports.getLogout = getLogout;
exports.ignorePage = ignorePage;
exports.viewTodo = viewTodo;
exports.addTodo = addTodo;