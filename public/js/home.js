const getTodo = function(){
  return data.map(function(todo){
    return `<p>${todo.title}</p><p>${todo.desc}</p><p>${todo.items}</p>`;
  }).join('<br>');
};

const showTodo = function(){
  let todoList = getTodo();
  document.getElementById('todoList').innerHTML = todoList;
}
