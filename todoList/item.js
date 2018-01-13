class Item {
  constructor() {
    this.item = {};
  }
  addItem(name,isDone=false){
    this.item.name = name;
    this.item.done = isDone;
  }
  getItem(){
    return this.item;
  }
}

module.exports=Item;
