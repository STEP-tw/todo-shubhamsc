const fs = require('fs');
const TodoList = require('./todoList.js');
const Items = require('./items.js');
const UsersTodo = require('./usersTodo.js');

let usersTodo = new UsersTodo()
let todoData = usersTodo.getUsersTodo();

const readTodo = function(){
  fs.readFile('./data/todoList.json','utf8',(err,data)=>{
    if(err || !data){
      usersTodo.readFromFile({});
      return;
    } 
    usersTodo.readFromFile(JSON.parse(data));
  })
}

const getTitle = function(todo){
  return todo.title;
};

const getDesc = function(todo){
  return todo.desc;
};

const getUserName = function(todo){
  return todo.userName;
}

const getItems = function(todo){
  let items = new Items();
  items.addItems(todo.items);
  return items.getItems();
}

const getTodoInfo = function(title,todoDetails){
  let todoList = new TodoList();
  let desc = getDesc(todoDetails)
  let items = getItems(todoDetails);
  todoList.createTodoList(title,desc,items);
  return todoList.getTodoList();
}

const getUserTodo = function(userName,title,todoInfo){
  let todo = {};
  todo[title]=todoInfo;
  usersTodo.addUsersTodo(userName,todo)
  return usersTodo.getUsersTodo();
}

const writeTodo = function(todoDetails){
  let title = getTitle(todoDetails);  
  let userName = getUserName(todoDetails);
  let todoInfo = getTodoInfo(title,todoDetails);
  let userTodo = getUserTodo(userName,title,todoInfo);
  fs.writeFile('data/todoList.json',JSON.stringify(userTodo,null,2),(err)=>{
    if(err) console.log(err);
  });
};

exports.readTodo = readTodo;
exports.writeTodo = writeTodo;
