const getTodo = function(){
  return data.map(function(todo){
    return `<b>${todo.title}</b>${todo.desc}<li>${todo.items}</li>`;
  }).join('');
};

const showTodo = function(){
  let todoList = getTodo();
  document.getElementById('todoList').innerHTML = todoList;
}
