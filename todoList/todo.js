const Items = require('./items.js');
class Todo {
  constructor(){
    this.todo = {};
  }
  create(title,desc,listOfItem){
    this.todo.title = title;
    this.todo.desc = desc;
    let items = new Items()
    items.parse(listOfItem);
    this.todo.items = items.getItems();
  }
  getTodo(){
    return this.todo;
  }
}

module.exports = Todo;