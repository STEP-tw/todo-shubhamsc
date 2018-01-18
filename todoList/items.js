const Item = require('./item.js');
class Items {
  constructor(){
    this.items = {};
    this.id = 1;
  }
  addItems(name,isDone=false){
    let item = new Item();
    item.addItem(name,isDone);
    this.items[this.id]=item.getItem();
    this.increaseId();
  }
  getItems(){
    return this.items;
  }
  getPrevItems(items){
    this.items = items;
    this.id = Object.keys(items).pop();
    this.increaseId();
  }
  increaseId(){
    this.id++;
  }
}

module.exports = Items;