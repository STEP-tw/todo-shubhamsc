const DataHandler = require('../todoList/dataHandler.js');
const TodoParser = require('../todoList/todoParser.js');
const fs = require('fs');
class TodoHandler {
  constructor(user){
    this.user = user;
    this.data = {};
    this.id = 1;
  }
  getUserData(){
    let database = new DataHandler();
    database.read();
    this.data = database.getUserData();
  }
  addNewTodo(todoInfo){
    let todoParser = new TodoParser();
    todoParser.parse(todoInfo);
    let todo = todoParser.getParseTodo();
    this.data[this.id] = todo;
    this.increaseId();
  }
  increaseId(){
    this.id++;
  }
  showUserTodo(){
    let titles = Object.keys(this.data).map(id=>{
      return `<a href=\"${id}\">${this.data[id].title}</a>`;
    }).join('<br>')
    fs.writeFile('./public/js/data.js',`var data = \`${titles}\``,(err)=>{
      console.log(err);
    });
  }
}

module.exports = TodoHandler;