class Todo {
  constructor(){
    this.todo = {};
  }
  createTodo(title,desc,items,isDone=false){
    this.todo.title = title;
    this.todo.desc = desc;
    this.todo.items = items;
    this.todo.done = isDone;
  }
  getTodo(){
    return this.todo;
  }
}

module.exports = Todo;