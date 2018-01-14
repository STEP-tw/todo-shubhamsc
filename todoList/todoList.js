const Todo = require('./todo.js');
class TodoList {
  constructor(){
    this.todoList = {};
  }
  createTodoList(title,desc,items=[]){
    let todo = new Todo();
    todo.createTodo(title,desc,items);
    this.todoList[title] = todo.getTodo();
  }
  getTodoList(){
    return this.todoList;
  }
  addPrevTodoList(todoList){
    this.todoList = todoList;
  }
}

module.exports = TodoList;