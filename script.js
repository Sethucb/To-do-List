// Code goes here


var todoList = {
  todos : [],
  addTodo: function(todoText){
    this.todos.push({
      todoText:todoText,
      completed: false
    });
  },
  changeTodo: function(position,todoText){
    // debugger;
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position){
    this.todos.splice(position,1);
  },
  toggleCompleted: function(position){
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll:function(){
    var totalTodos =  this.todos.length;
    var completedTodos = 0;
    
    this.todos.forEach(function(todo){
      if(todo.completed === true){
        completedTodos++;
      }
    });
    
    this.todos.forEach(function(todo){
      if(completedTodos === totalTodos){
        todo.completed = false;
      }else{
        todo.completed = true;
      }
    });
  }
};

var handlers = {
  toggleAll: function(){
              todoList.toggleAll();
              view.displayTodos();
  },
  addTodo: function(){
          var addTodoTextInput = document.getElementById('addTodoTextInput');
          todoList.addTodo(addTodoTextInput.value);
          addTodoTextInput.value = '';
          view.displayTodos();
  },
  changeTodo: function(){
          var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
          var changeTodoTextInput = document.getElementById('changeTodoTextInput');
          var number = changeTodoPositionInput.valueAsNumber;
          if(number > -1){
            todoList.changeTodo(number,changeTodoTextInput.value);
          }
          changeTodoPositionInput.value = '';
          changeTodoTextInput.value = '';
          view.displayTodos();
  },
  deleteTodo: function(position){
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(){
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    var number = toggleCompletedPositionInput.valueAsNumber;
    if(number > -1){
      todoList.toggleCompleted(number);
    }
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  }
};

var view = {
  displayTodos: function(){
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';

    todoList.todos.forEach(function(todo,position){
      var todoLi = document.createElement('li');
      if(todo.completed === true){
        todoLi.className = 'completedTodo';
      }
      todoLi.id = position;
      todoLi.textContent = todo.todoText;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    },this);
  },
  createDeleteButton : function(){
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners:function(){
    var todosUrl = document.querySelector('ul');
    todosUrl.addEventListener('click',function(event){
      var elementClicked = event.target;
      if(elementClicked.className === 'deleteButton'){
        var id = parseInt(elementClicked.parentNode.id);
        handlers.deleteTodo(id);
      }
    });
  }
};

view.setUpEventListeners();
