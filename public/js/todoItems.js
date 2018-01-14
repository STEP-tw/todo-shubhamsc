const showItems = function(){
  let list = document.createElement('li');
  document.querySelector("#todoItems").appendChild(list).innerText = this.responseText;
}

const addItems = function(){
  let req = new XMLHttpRequest();
  req.addEventListener('load',showItems);
  req.open('GET','/items');
  req.send();
}

const start = function(){
  document.getElementById('addItems').onclick = addItems;
}

window.onload = start;
