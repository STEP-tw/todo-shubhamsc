const getTodo = function(){
  return  data || '';
};

const showTodoList = function(){
  let todoList = getTodo();
  document.getElementById('todoList').innerHTML = todoList;
}

window.onload = showTodoList;