const fs = require('fs');
const TodoList = require('./todoList.js');
const Items = require('./items.js');
const UsersTodo = require('./usersTodo.js');
let usersTodo = new UsersTodo();

const readTodo = function(){
  fs.readFile('./data/todoList.json','utf8',(err,data)=>{
    if(err || !data){
      usersTodo.readFromFile({});
      return;
    } 
    usersTodo.readFromFile(JSON.parse(data));
  })
};

const getTitle = function(todo){
  return todo.title;
};

const getDesc = function(todo){
  return todo.desc;
};

const getUserName = function(todo){
  return todo.userName;
}

const getUpdatedItems = function(todoDetails){
  let title = getTitle(todoDetails);  
  let user = getUserName(todoDetails);  
  let todoInfo = usersTodo.getUsersTodo();
  let items = new Items();
  if(todoInfo[user]){
    let prevTodo = todoInfo[user].todo;
    if(prevTodo){
      let prevItems = prevTodo[title].items;
      items.getPrevItems(prevItems);
    }
  }
  items.addItems(todoDetails.item);
  return items.getItems();
};

const getUserTodoList = function(todoDetails,prevTodoList){
  let title = getTitle(todoDetails);
  let desc = getDesc(todoDetails);
  let items = getUpdatedItems(todoDetails);  
  let todoList = new TodoList();
  todoList.addPrevTodoList(prevTodoList);
  todoList.createTodoList(title,desc,items);
  return todoList.getTodoList();
};

const getUserData = function(todoDetails){
  let userName = todoDetails.userName;
  let todoData = usersTodo.getUsersTodo();    
  return todoData[userName];
};

const getUpdatedDataBase = function(todoDetails){
  let user = getUserName(todoDetails);
  let title = getTitle(todoDetails);
  let todoData = usersTodo.getUsersTodo();
  let userData = todoData[user] || {};
  let prevTodo = userData.todo || {};
  let todo = getUserTodoList(todoDetails,prevTodo);
  usersTodo.addUsersTodo(user,todo);
  return usersTodo.getUsersTodo();
};

const writeInDataBase = function(data){  
  fs.writeFile('data/todoList.json',JSON.stringify(data,null,2),(err)=>{
    if(err) console.log(err);
  });
};

const writeInUserDataFile = function(userData){
  fs.writeFile('public/js/data.js',`var data = ${JSON.stringify(userData)}`,(err)=>{
    if(err) console.log(err);
  });
};

const writeTodo = function(todoDetails){
  let data = getUpdatedDataBase(todoDetails);
  let userData = getUserData(todoDetails);
  writeInDataBase(data);
  writeInUserDataFile(userData);
};

const writeuserData = function(userDetails){
  let userData = getUserData(userDetails);
  fs.writeFile('public/js/data.js',`var data = ${JSON.stringify(userData)}`,(err)=>{
    if(err) console.log(err);
  });
}

exports.readTodo = readTodo;
exports.writeTodo = writeTodo;
exports.writeuserData = writeuserData;
