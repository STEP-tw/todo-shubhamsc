const fs = require('fs');
const todoHandler = require('../todoList/todoHandler.js');
todoHandler.readTodo();
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
      res.pageNotFound();
      return;
    } 
    let loginData = data.replace(/LOGIN_ERROR/, error);
    showContents(req, res, loginData);
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
  todoHandler.writeuserData({userName:user.userName});  
  res.redirect('/home');
};

const getLogout = function (req, res) {
  res.setHeader('Set-Cookie', [`sessionId=0; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`,
    `userName=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
  ]);
  res.redirect('/login')
};


const getTypes = function (extn) {
  let types = {
    html: 'text/html',
    jpg: 'image/jpg',
    gif: 'image/gif',
    pdf: 'application/pdf',
    css: 'text/css',
    js: 'text/javascript'
  };
  return types[extn];
};

const showContents = function (req, res, data) {
  let extn = req.url.split('.').pop();
  if (extn == req.url) {
    extn = 'html';
  }
  let type = getTypes(extn);
  res.statusCode = 200;
  res.setHeader('Content-Type', type);
  res.write(data);
  res.end();
};

const readFileContents = function(req,res){
  fs.readFile(`./public${req.url}`, (err, data) => {
    if (err) {
      res.pageNotFound();
      return;
    }
    let userName = req.cookie.userName||'';
    data = data.toString().replace(/USER_NAME/,userName);
    showContents(req, res, data);
  });
}

const displayPage = function (req, res) {
  if(req.url=='/login') return;
  if(req.url=='/items') return;
  let extn = req.url.split('.').pop();
  if(extn=='html'){
    res.pageNotFound();
    return;
  }
  if (extn == req.url) {
    req.url = `${req.url}.html`;
  }
  readFileContents(req,res);
};

const ignorePage = function (req, res) {
  res.end();
};

const createTodo = function(req,res){
  let todo = req.body;
  todo.userName = req.cookie.userName;
  todoHandler.writeTodo(todo);
  res.setHeader('Set-Cookie', [`title=${todo.title}`, `desc=${todo.desc}`])
  res.redirect('/items');  
};

const viewTodo = function(req,res){
  res.write('Not yet implement');
  res.end();
};

const getItems = function(req,res){
  let title = req.cookie.title;
  let desc = req.cookie.desc;
  let userName = req.cookie.userName;  
  fs.readFile('./public/todoItems.html','utf-8',(err,data)=>{
    let contents = data.replace(/TITLE/,title);
    contents = contents.replace(/DESC/,desc);
    contents = contents.toString().replace(/USER_NAME/,userName);    
    showContents(req,res,contents);
  })
};

const addItem = function(req,res){
  let todo = {};
  todo.userName = req.cookie.userName;
  todo.title = req.cookie.title;
  todo.desc = req.cookie.desc;
  todo.item = req.body.item;
  todoHandler.writeTodo(todo);  
  res.end();
}

exports.loadUser = loadUser;
exports.checkForAlreadyLoggedIn = checkForAlreadyLoggedIn;
exports.loginUserSendToHome = loginUserSendToHome;
exports.logoutUserSendToLogin = logoutUserSendToLogin;
exports.getLogin = getLogin;
exports.postLogin = postLogin;
exports.getLogout = getLogout;
exports.displayPage = displayPage;
exports.ignorePage = ignorePage;
exports.createTodo = createTodo;
exports.viewTodo = viewTodo;
exports.getItems = getItems;
exports.addItem = addItem;