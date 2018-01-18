class Todo {
  constructor(){
    this.todo = {};
  }
  createTodo(id,title,desc,items,isDone=false){
    this.todo.id = id;
    this.todo.title = title;
    this.todo.desc = desc;
    this.todo.items = items;
    this.todo.done = isDone;
  }
  getTodo(){
    return this.todo;
  }
  getTitle(){
    return this.todo.title;
  }
  getDesc(){
    return this.todo.desc;
  }
  getItems(){
    return this.todo.items;
  }
}

module.exports = Todo;