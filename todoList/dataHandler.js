const fs = require('fs');
class DataBase {
  constructor(){
    this.data = {};
  }
  read(){
    fs.readFile('./data/todoList.json','utf8',(err,data)=>{
      if(err || !data){
        return;
      } 
      this.data = data;
    })
  }
  write(data,path){
    fs.writeFile(path,JSON.stringify(data,null,2),(err)=>{
      if(err) console.log(err);
    });
  }
  writeInDatabase(user,data){
    this.data[user]=data;
    this.write(this.data,'data/todoList.json');
  }
  writeTodoList(todoList){
    let data = todoList.join('<br>');
    this.write(data,'public/js/data.js');
  }
  getUsers(){
    return Object.keys(this.data);
  }
  getUserData(user){
    return this.data[user];
  }
}

module.exports = DataBase;