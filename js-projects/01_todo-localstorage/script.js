document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");
  const addTaskButton = document.getElementById("add-task-btn");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTask(task));

  addTaskButton.addEventListener("click", () => {
    const tasktext = todoInput.value.trim();
    if (tasktext == "") return;

    const newtask = {
      id: Date.now(),
      text: tasktext,
      completed: false,
    };
    tasks.push(newtask);
    saveTasks();
    renderTask(newtask);
    todoInput.value = "";
    console.log(tasks);
  });
  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.innerHTML = `
      <span>${task.text}</span>
      <button class="delete-btn">Delete</button>
    `;
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();
    });

    todoList.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
