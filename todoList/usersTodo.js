const UserTodo = require('./userTodo.js');
class UsersTodo {
  constructor(){
    this.usersTodo = {};
  }
  addUsersTodo(name,todo){
    let userTodo = new UserTodo();
    userTodo.addUserTodo(name,todo);
    this.usersTodo[name] = userTodo.getUserTodo();
  }
  getUsersTodo(){
    return this.usersTodo;
  }
  readFromFile(usersTodo){
    this.usersTodo = usersTodo;
  }
}

module.exports = UsersTodo;