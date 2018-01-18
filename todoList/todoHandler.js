const TodoList = require('./todoList.js');
const Items = require('./items.js');
const UsersTodo = require('./usersTodo.js');
const DataBase = require('./dataHandler.js');
let database = new DataBase();

class TodoHandler {
  constructor(){
    
  }
  create(data){
    let name = getUserName(data);
    let title = getTitle(data)
    let desc = getDesc(data);
    todoList.createTodoList(title,desc);
  }
  displayTodoList(user){
    let usersTodo = new UsersTodo();
    let userData = database.getUserData(user);
    usersTodo.addUsersTodo(user,userData);
    let todoList = usersTodo.getUserTodoList(user);
    database.writeTodoList(todoList); 
  }
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



module.exports = TodoHandler;