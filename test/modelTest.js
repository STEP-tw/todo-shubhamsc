const chai = require('chai');
const assert = chai.assert;
const Item = require('../todoList/item.js');
const Items = require('../todoList/items.js');
const Todo = require('../todoList/todo.js');
const TodoList = require('../todoList/todoList.js');
const UserTodo = require('../todoList/userTodo.js');
const UsersTodo = require('../todoList/usersTodo.js');


describe('todo item',()=>{
  describe('addItem',()=>{
    it('should add item in a object with not done',()=>{
      let item = new Item();
      let expected = {name:'todoApp',done:false};
      item.addItem('todoApp');
      let actual = item.getItem()
      assert.deepEqual(actual,expected)
    })
    it('should add item in a object with done is true',()=>{
      let item = new Item();
      let expected = {name:'todoApp',done:true};
      item.addItem('todoApp',true);
      let actual = item.getItem()
      assert.deepEqual(actual,expected)
    })
  })
})

describe('todo items',()=>{
  describe('addItems',()=>{
    it('should add item in a items list',()=>{
      let items = new Items();
      let expected = [{item:{name:'todoApp',done:false}}];
      items.addItems('todoApp');
      let actual = items.getItems()
      assert.deepEqual(actual,expected)
    })
    it('should add number of item in items list',()=>{
      let items = new Items();
      let expected = [{item:{name:'create todo',done:false}},
      {item:{name:'create database',done:false}},
      {item:{name:'create model',done:false}}];
      items.addItems('create todo');
      items.addItems('create database');
      items.addItems('create model');      
      let actual = items.getItems()
      assert.deepEqual(actual,expected)
    })
  })
})

describe('todo',()=>{
  describe('create todo',()=>{
    it('should create todo with title, description,items and isDone',()=>{
      let todo = new Todo();
      let expected = {title:'App',desc:'create a todo app',items:[{item:{name:'todoApp',done:false}}],done:false};
      todo.createTodo('App','create a todo app',[{item:{name:'todoApp',done:false}}]);
      let actual = todo.getTodo()
      assert.deepEqual(actual,expected)
    })
  })
})

describe('todoList',()=>{
  describe('add todo in List',()=>{
    it('should add todo in todo list with title',()=>{
      let todoList = new TodoList();
      let expected = {App:{title:'App',desc:'create a todo app',items:[{item:{name:'todoApp',done:false}}],done:false}};
      todoList.createTodoList('App','create a todo app',[{item:{name:'todoApp',done:false}}]);
      let actual = todoList.getTodoList()
      assert.deepEqual(actual,expected)
    })
  })
  describe('add todo in current todo list',()=>{
    it('should add todo in already exist todo list with new title',()=>{
      let todoList = new TodoList();
      let expected = {todoApp:{title:'todoApp',desc:'create a todo app',items:[{item:{name:'todoApp',done:false}}],done:false},
      flowerApp:{title:'flowerApp',desc:'create a flower catalog app',items:[{item:{name:'image',done:false}}],done:false}};
      todoList.addPrevTodoList({todoApp:{title:'todoApp',desc:'create a todo app',items:[{item:{name:'todoApp',done:false}}],done:false}})
      todoList.createTodoList('flowerApp','create a flower catalog app',[{item:{name:'image',done:false}}]);
      let actual = todoList.getTodoList()
      assert.deepEqual(actual,expected)
    })
  })
})

describe('user todo',()=>{
  describe('add userTodo',()=>{
    it('should add todo in user todo list',()=>{
      let userTodo = new UserTodo();
      let expected = {name:'shubham',todo:{}};
      userTodo.addUserTodo('shubham',{});
      let actual = userTodo.getUserTodo()
      assert.deepEqual(actual,expected)
    })
  })
})


describe('users todo',()=>{
  describe('add usersTodo',()=>{
    it('should add user todo in a specific user\'s todo',()=>{
      let usersTodo = new UsersTodo();
      let expected = {shubham:{name:'shubham',todo:{}}};
      usersTodo.addUsersTodo('shubham',{});
      let actual = usersTodo.getUsersTodo()
      assert.deepEqual(actual,expected)
    })
  })
  describe('add user\'s todo in already exist user\'s todo',()=>{
    it('should add user todo in user\'s todo list',()=>{
      let usersTodo = new UsersTodo();
      let expected = {singh:{name:'singh',todo:{}},shubham:{name:'shubham',todo:{}}};
      usersTodo.readFromFile({singh:{name:'singh',todo:{}}})
      usersTodo.addUsersTodo('shubham',{});
      let actual = usersTodo.getUsersTodo()
      assert.deepEqual(actual,expected)
    })
  })
})

