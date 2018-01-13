class UserTodo {
  constructor(){
    this.userTodo = {};
  }
  addUserTodo(name,todo){
    this.userTodo.name = name;
    this.userTodo.todo = todo;
  }
  getUserTodo(){
    return this.userTodo;
  }
}

module.exports = UserTodo;