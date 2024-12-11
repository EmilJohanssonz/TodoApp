
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}


class TodoApp {
  private todos: Todo[] = [];
  private nextId: number = 1;

  
  addTodo(text: string): void {
    const newTodo: Todo = {
      id: this.nextId++,
      text,
      completed: false,
    };
    this.todos.push(newTodo);
  }

  
  toggleTodo(id: number): void {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

 
  deleteTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  
  getTodos(): Todo[] {
    return this.todos;
  }
}


const todoForm = document.getElementById("add-todo-form") as HTMLFormElement;
const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;


const app = new TodoApp();


if (todoForm) {
  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
      app.addTodo(text);
      todoInput.value = ""; 
      renderTodos(); 
    }
  });
}


function renderTodos() {
  todoList.innerHTML = ""; 
  const todos = app.getTodos();

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.alignItems = "center";

    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed; 
    checkbox.addEventListener("change", () => {
      app.toggleTodo(todo.id); 
      renderTodos(); 
    });

    
    const span = document.createElement("span");
    span.textContent = todo.text;
    span.style.marginLeft = "0.5rem";
    span.style.textDecoration = todo.completed ? "line-through" : "none";

    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "auto";
    deleteButton.addEventListener("click", () => {
      app.deleteTodo(todo.id);
      renderTodos();
    });

    
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    todoList.appendChild(li);
  });
}


renderTodos();