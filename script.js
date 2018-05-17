var todoList = {
  todos: [],
  addTodo: function (todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function (position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function (position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function (position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function () {
    var completedTodos = 0;
    for (var i = 0; i < this.todos.length; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }
    if (completedTodos === this.todos.length) {
      for (var i = 0; i < this.todos.length; i++) {
        this.todos[i].completed = false;
      }
    } else {
      for (var i = 0; i < this.todos.length; i++) {
        this.todos[i].completed = true;
      }
    }
  }
};

var handlers = {
  addTodo: function () {
    var addTodoInputText = document.getElementById("addTodoTextInput");
    todoList.addTodo(addTodoInputText.value);
    addTodoTextInput.value = "";
    view.displayTodos();
  },
  changeTodo: function () {
    var changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
    var changeTodoTextInput = document.getElementById("changeTodoTextInput");
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = "";
    changeTodoTextInput.value = "";
    view.displayTodos();
  },
  deleteTodo: function () {
    var deleteTodoPositionInput = document.getElementById("deleteTodoPositionInput")
    todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
    deleteTodoPositionInput.value = "";
    view.displayTodos();
  },
  toggleCompleted: function () {
    var toggleCompletedPositionInput = document.getElementById("toggleCompletedPositionInput");
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = "";
    view.displayTodos();
  },
  toggleAll: function () {
    todoList.toggleAll();
    view.displayTodos();
  }
};

var view = {
  displayTodos: function () {
    var todosUl = document.querySelector("ul");
    todosUl.innerHTML = "";
    for (var i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement("li");
      var todoTextWithCompletion = "";
      var todo = todoList.todos[i];

      if (todo.completed === true) {
        todoTextWithCompletion = "(x) " + todo.todoText;
      } else {
        todoTextWithCompletion = "( ) " + todo.todoText;
      }

      todoLi.textContent = todoTextWithCompletion;
      todosUl.appendChild(todoLi);
    }
  }
};