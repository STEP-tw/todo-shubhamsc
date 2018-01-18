const Todo = require('./todo.js');
class TodoList {
  constructor(){
    this.todoList = {};
    this.id=1;
  }
  createTodoList(title,desc,items={}){
    let todo = new Todo();
    todo.createTodo(this.id,title,desc,items);
    this.todoList[this.id] = todo.getTodo();
    this.increaseId();
  }
  getTodoList(){
    return this.todoList;
  }
  addPrevTodoList(todoList){
    this.todoList = todoList;
    this.id = Object.keys(todoList).pop() || 0;
    this.increaseId();
  }
  increaseId(){
    this.id++;
  }
}

module.exports = TodoList;