const Item = require('./item.js');
class Items {
  constructor(){
    this.items = [];
  }
  addItems(name,isDone=false){
    let item = new Item();
    item.addItem(name,isDone);
    this.items.push(item);
  }
  getItems(){
    return this.items;
  }
}

module.exports = Items;