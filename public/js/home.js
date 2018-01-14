const getTodo = function(){
  let titles = Object.keys(data.todo);
  return titles.map(function(title){
    return `<a href="view" id="${title}">${title}</a>`
  }).join('<br>');
};

const showTodo = function(){
  let todoList = getTodo();
  document.getElementById('todoList').innerHTML = todoList;
}
