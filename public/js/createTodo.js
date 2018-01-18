class Items {
  constructor(){
    this.items = [];
  }
  addItems(item){
    this.items.push(item);
  }
  getItems(){
    return this.items;
  }
}
let items = new Items();  

const createTodo = function(){
  let title = document.getElementById('title').value;
  let desc = document.getElementById('desc').value;
  let itemList = items.getItems();
  let req = new XMLHttpRequest();
  req.open('POST','addTodo');
  let data = `title=${title}&desc=${desc}&items=${itemList}`;
  req.send(data);
  document.getElementById('title').value = '';
  document.getElementById('desc').value = '';  
}

const addItem = function(){
  let list = document.createElement('li');
  let item = document.getElementById('item').value;
  if(!item) return;
  document.querySelector("#todoItems").appendChild(list).innerText = item;
  document.getElementById('item').value = '';
  items.addItems(item);
}

const start = function(){
  document.getElementById('addItem').onclick = addItem;
  document.getElementById('submit').onclick = createTodo;
}

window.onload = start;
