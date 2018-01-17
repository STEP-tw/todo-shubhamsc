const addItems = function(){
  let list = document.createElement('li');
  let item = document.getElementById('item').value;
  document.querySelector("#todoItems").appendChild(list).innerText = item;

  let req = new XMLHttpRequest();
  req.open('POST','addItem');
  req.send(`item=${item}`);
}

const start = function(){
  document.getElementById('addItems').onclick = addItems;
}

window.onload = start;
