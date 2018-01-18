const getTodo = function(){
  return  todo || '';
};

const showTodo = function(){
  let todo = getTodo();
  document.getElementById('todo').innerHTML = todo;
}

window.onload = showTodo;