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
  describe('parse',()=>{
    it('should add item in a item\'s list',()=>{
      let items = new Items();
      let expected = {1:{name:'todoApp',done:false}};
      items.parse('todoApp');
      let actual = items.getItems()
      assert.deepEqual(actual,expected)
    })
    it('should add number of item in item\'s list',()=>{
      let items = new Items();
      let expected = {1:{name:'create todo',done:false},
      2:{name:'create database',done:false},
      3:{name:'create model',done:false}};
      items.parse('create todo,create database,create model');   
      let actual = items.getItems()
      assert.deepEqual(actual,expected)
    })
  })
})

describe('todo',()=>{
  describe('create todo',()=>{
    it('should create todo with title, description,items and isDone',()=>{
      let todo = new Todo();
      let expected = {title:'App',desc:'create a todo app',items:{1:{name:'todoApp',done:false}}};
      todo.create('App','create a todo app','todoApp');
      let actual = todo.getTodo()
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

