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
  getUserTodoList(user){
    let ids = Object.keys(user);
    return ids.map((id)=>id.title);
  }
}

module.exports = UsersTodo;