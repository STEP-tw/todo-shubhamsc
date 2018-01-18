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
  write(user,data){
    this.data[user]=data;
    fs.writeFile('data/todoList.json',JSON.stringify(this.data,null,2),(err)=>{
      if(err) console.log(err);
    });
  }
  getUsers(){
    return Object.keys(this.data);
  }
  getUserData(user){
    return this.data[user]||{};
  }
}

module.exports = DataBase;