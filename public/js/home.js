const getTodo = function(){
  return  data || '';
};

const showTodo = function(){
  let todoList = getTodo();
  document.getElementById('todoList').innerHTML = todoList;
}

window.onload = showTodo;