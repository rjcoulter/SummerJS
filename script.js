// An todolist object that houses the actual element
var todoList = {
  // The array that stores the todo objects
  todos: [],
  // A method to add a todo object to the array, contains a text and a completed property 
  addTodo: function (todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  // A method that changes the text of a todo item when given its position
  changeTodo: function (position, todoText) {
    this.todos[position].todoText = todoText;
  },
  // A method that uses the splice function of an array to delete an element given a position
  deleteTodo: function (position) {
    this.todos.splice(position, 1);
  },
  // A method that toggles whether or not an item has been completed when given a position
  toggleCompleted: function (position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },

  // A method that will toggle all of the items, will change all to false if all are true, and all to true otherwise
  toggleAll: function () {
    // The total number of items
    var totalTodos = this.todos.length;
    // The number of items that are complete
    var completedTodos = 0;

    // Iterates to the item and adds to the number of completed items it the completed property is true
    this.todos.forEach(function (todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });

    // Iterates through all the items in the array
    this.todos.forEach(function (todo) {
      // if all are completed, set all to be false
      if (completedTodos === totalTodos) {
        todo.completed = false;
        // otherwise, set all to be true
      } else {
        todo.completed = true;
      }
    });
  }
};

// An object handlers, that deals with the button interactions
var handlers = {
  // Method that is run whenever the add button is clicked
  addTodo: function () {
    // Retrieves the associated text input
    var addTodoTextInput = document.getElementById("addTodoTextInput");
    // Adds the value and then resets the input field
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  // Method that is run whenver the Change Todo button is clicked
  changeTodo: function () {
    // Retrieves the position and the new text value
    var changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
    var changeTodoTextInput = document.getElementById("changeTodoTextInput");
    // Changes the value and then resets the input fields
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = "";
    changeTodoTextInput.value = "";
    view.displayTodos();
  },
  // A method that runs whenever the delete button is clicked next to an item
  deleteTodo: function (position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  // A method that toggles whether or not an individual item has been completed
  toggleCompleted: function () {
    // Retrieves the position of the item to change
    var toggleCompletedPositionInput = document.getElementById("toggleCompletedPositionInput");
    // Toggles the value and then resets the input field
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = "";
    view.displayTodos();
  },
  // A method that toggles the completed property of all the items
  toggleAll: function () {
    todoList.toggleAll();
    view.displayTodos();
  }
};

// An object to display all of the items on the page
var view = {
  // A method that will display all of the items
  displayTodos: function () {
    // Finds the unordered list in index.html
    var todosUl = document.querySelector("ul");
    todosUl.innerHTML = "";

    // Creates a list item for each item present in the todos array
    todoList.todos.forEach(function (todo, position) {
      var todoLi = document.createElement("li");
      var todoWithTextCompletion = "";

      // Changes the text according to wheter or not the item has been marked as completed
      if (todo.completed === true) {
        todoWithTextCompletion = "(X) " + todo.todoText;
      } else {
        todoWithTextCompletion = "(  ) " + todo.todoText;
      }

      // Sets the item to have the correct text
      todoLi.id = position;
      todoLi.textContent = todoWithTextCompletion;

      // Adds a delete element to each list item
      todoLi.appendChild(this.createDeleteButton());

      // Adds the list element to the unordered list
      todosUl.appendChild(todoLi);
    }, this);
  },
  // A method to create the delete button
  createDeleteButton: function () {
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    return deleteButton;
  },
  // Handles the interaction for when a delete button is clicked
  setUpEventListeners: function () {
    var todosUl = document.querySelector("ul");
    // Creates an event listener for all the delete buttons
    todosUl.addEventListener("click", function (event) {
      var elementClicked = event.target;
      if (elementClicked.className === "deleteButton") {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};
view.setUpEventListeners();