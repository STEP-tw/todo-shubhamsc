const Item = require('./item.js');
class Items {
  constructor(){
    this.items = {};
    this.id = 1;
  }
  parse(items){
    items = items.split(',');
    items.forEach(name => {
      let item = new Item();
      item.addItem(name);
      this.items[this.id]=item.getItem();
      this.increaseId();
    });
  }
  getItems(){
    return this.items;
  }
  increaseId(){
    this.id++;
  }
}

module.exports = Items;