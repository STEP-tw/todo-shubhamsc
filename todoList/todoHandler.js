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
      return `<a href=\"todo/${this.user}/${id}\">${this.data[id].title}</a>`;
    }).join('<br>')
    fs.writeFile('./public/js/data.js',`var data = \`${titles}\``,(err)=>{
      console.log(err);
    });
  }
  displayTodo(id){
    let title = this.getTitle(id);
    let desc = this.getDesc(id);
    let items = this.getItems(id);
    let itemList = items.map(item=>{
      return `  <a href=\"${item}\">${item}</a>`;
    }).join('<br>');
    let data = [`Title:\\t<a href=\"${title}\">${title}</a>`,
    `Description: \\t<a href=\"${desc}\">${desc}</a>`,`Items:<br>${itemList}`];
    fs.writeFile('./public/js/todo.js',`var todo = \`${data.join('<br>')}\``,(err)=>{
      console.log(err);
    });
  }
  getTitle(id){
    console.log(this.data,id);
    return this.data[id].title;
  }
  getDesc(id){
    return this.data[id].desc;
  }
  getItems(id){
    let items = this.data[id].items;
    let ids = Object.keys(items);
    return ids.map(id=>{
      return items[id].name;
    });
  }
}

module.exports = TodoHandler;