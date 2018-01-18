const Todo = require('./todo.js');
class TodoParser {
  constructor(){
    this.todo = {};
    this.todoInfo = {};
  }
  parse(todoInfo){
    this.todoInfo = todoInfo;
    let title = this.getTitle();
    let desc = this.getDesc();
    let items = this.getItems();
    let todo = new Todo();
    todo.create(title,desc,items);
    this.todo = todo.getTodo();
  }
  getParseTodo(){
    return this.todo;
  }
  getTitle(){
    return this.todoInfo.title;
  }
  getDesc(){
    return this.todoInfo.desc;
  }
  getItems(){
    return this.todoInfo.items;
  }
}

module.exports = TodoParser;