const todoForm = document.getElementById("todoForm");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const todoList = document.getElementById("todoList");

todoForm.addEventListener("submit", function (event) {
  event.preventDefault(); 

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();

  if (title && description) {
    const todo = {
      title,
      description
    };

    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    const index = todoForm.send.dataset.index;

    if (index !== undefined) {
      todos[index] = todo;
      document.getElementById("send").innerText = "Add"; 
      delete todoForm.send.dataset.index; 
    } else {
      todos.push(todo);
    }

    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodoList();
  } else {
    console.log("Judul dan deskripsi tidak boleh kosong!");
  }

  todoForm.reset();
});

window.onload = function () {
  renderTodoList();
};

function renderTodoList() {
  todoList.innerHTML = ""; 

  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `
      <div>
        <strong>${index + 1}. ${todo.title}</strong><br>
        ${todo.description}<br>
        <button class="btn btn-danger btn-sm mt-2" onclick="deleteTodo(${index})">Delete</button>
        <button class="btn btn-primary btn-sm mt-2" onclick="editTodo(${index})">Edit</button>
      </div>`;
    todoList.appendChild(li);
  });
}

function deleteTodo(index) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodoList();
}

function editTodo(index) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  const todo = todos[index];

  titleInput.value = todo.title;
  descriptionInput.value = todo.description;

  document.getElementById("send").innerText = "Save";

  document.getElementById("send").dataset.index = index;
}
