const getTodo = function(){
  let todoList = Object.keys(data.todo);
  return todoList.map(function(todo){
    return `<a href="view" id="${todo.id}">${todo.title}</a>`
  }).join('<br>');
};

const showTodo = function(){
  let todoList = getTodo();
  document.getElementById('todoList').innerHTML = todoList;
}
