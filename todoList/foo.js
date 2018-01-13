const fs = require('fs');
let userTODO = [];

const getTodoInfo = function(todoList){
  let todo = {};
  todo.name=todoList.name;
  todo.title = todoList.title;
  todo.desc = todoList.desc;
  todo.items = todoList.items || [];
  return todo;
}

const readTodo = function(){
  fs.readFile('./data/todoList.json','utf8',(err,data)=>{
    if(err) console.log(err);
    userTODO = JSON.parse(data);
  })
}

const writeTodo = function(todoList){
  let todoInfo = getTodoInfo(todoList);
  userTODO.push(todoInfo)
  fs.writeFile('data/todoList.json',JSON.stringify(userTODO),(err)=>{
    if(err) console.log(err);
  });
  fs.writeFile('public/js/data.js',"var data = "+JSON.stringify(userTODO),(err)=>{if(err)console.log(err)});
};


exports.readTodo = readTodo;
exports.writeTodo = writeTodo;
