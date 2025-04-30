// Below will be the array to hold the submitted tasks and the ID counter 
let tasks = [];
let taskId = 0;

// The variables below are used to get the form and task manager properties
const taskForm = document.getElementById('taskForm');
const taskManager = document.getElementById('taskmanager');

taskForm.addEventListener('submit', function(event){
  event.preventDefault();
  addTask();
});

// Below will be the function to add a task.
function addTask() {
  const task = document.getElementById('taskName').value.trim();
  const priority = document.getElementById('taskPriority').value;
  const isImportant = document.getElementById('Important').checked;
  const isCompleted = document.getElementById('Completed').checked;

  // If the user does not enter anything an error message will appear
  if (task === "") {
    alert("Task name cannot be empty!");
    return;
  }

  // Below creates a new task object with all of the information within it. 
  const newTask = {
    id: ++taskId,
    name: task,
    priority: priority,
    isImportant: isImportant,
    isCompleted: isCompleted,
    date: new Date().toLocaleString()
  };

  /* 
    Once the task is created, the page will reload showing the submited task and
    allow the user to edit, delete, or complete a task.
  */
  tasks.push(newTask);
  console.log(JSON.stringify(tasks));
  renderTasks();
  taskForm.reset();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  console.log(JSON.stringify(tasks));
  renderTasks();
}

// Below will cross out the task name when it is completed
function toggleCompletion(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.isCompleted = !task.isCompleted;
    console.log(JSON.stringify(tasks));
    renderTasks();
  }
}

// Below will allow the user to edit the task.
function editTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
      document.getElementById('taskName').value = task.name;
      document.getElementById('taskPriority').value = task.priority;
      document.getElementById('Important').checked = task.isImportant;
      document.getElementById('Completed').checked = task.isCompleted;
  
      // Remove the task from the array to avoid duplication
      deleteTask(id);
    }
  }

// The function is used to render the tasks on the page. 
function renderTasks() {
  taskManager.innerHTML = "";

  tasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    if (task.priority === "High") {
      taskDiv.classList.add('high');
    } else if (task.priority === "Medium") {
      taskDiv.classList.add('medium');
    } else if (task.priority === "Low") {
      taskDiv.classList.add('low');
    }

    if (task.isImportant) {
      taskDiv.classList.add('important');
    }

    if (task.isCompleted) {
      taskDiv.classList.add('completed');
    }

    // Back in the HTML file will display the buttons to complete, edit, or delete a task along with the task name and priority.
    taskDiv.innerHTML = `
      <strong>${task.name}</strong> [${task.priority}]<br>
      <small>Added: ${task.date}</small>
      <button onclick="toggleCompletion(${task.id})">Toggle Complete</button>
      <button onclick="editTask(${task.id})">Edit</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;

    /* 
      Once the all is set and done, below will append the all of
      the task information to the task manager web application.
    */ 
    taskManager.appendChild(taskDiv);
  });
}
