// Below will be the array to hold the submitted tasks and the ID counter 
let tasks = [];
let taskId = 0;

// The variables below are used to get the form and task manager properties
const taskForm = document.getElementById('taskForm');
const taskManager = document.getElementById('taskmanager');

if (taskForm && taskManager) {
  taskForm.addEventListener('submit', function(event){
    event.preventDefault();
    addTask();
  });
} else {
  console.error("Required HTML elements (taskForm or taskManager) are missing.");
}

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

/*
  Below will allow the user to edit the task. By far the hardest part of the project since I do not
  want the data to be remove but to be edited in the same spot. Below will create a inline edit so the 
  user can change the task name and priority without having to delete and create a new task.
*/
function editTask(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    const taskDiv = document.querySelector(`.task:nth-child(${tasks.indexOf(task) + 1})`);
    if (taskDiv) {
      // Clear the taskDiv and create an inline edit form
      taskDiv.innerHTML = `
        <input type="text" id="editTaskName" value="${task.name}" placeholder="Task Name">
        <select id="editTaskPriority">
          <option value="High" ${task.priority === "High" ? "selected" : ""}>High</option>
          <option value="Medium" ${task.priority === "Medium" ? "selected" : ""}>Medium</option>
          <option value="Low" ${task.priority === "Low" ? "selected" : ""}>Low</option>
        </select>
        <label>
          <input type="checkbox" id="editImportant" ${task.isImportant ? "checked" : ""}> Important
        </label>
        <label>
          <input type="checkbox" id="editCompleted" ${task.isCompleted ? "checked" : ""}> Completed
        </label>
        <button onclick="saveTask(${task.id})">Save</button>
        <button onclick="cancelEdit(${task.id})">Cancel</button>
      `;
    }
  }
}
// This function is part of the edit function from above as.
function saveTask(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    const taskDiv = document.querySelector(`.task:nth-child(${tasks.indexOf(task) + 1})`);
    if (taskDiv) {
      // Updates the task properties from the edit form
      task.name = document.getElementById('editTaskName').value.trim();
      task.priority = document.getElementById('editTaskPriority').value;
      task.isImportant = document.getElementById('editImportant').checked;
      task.isCompleted = document.getElementById('editCompleted').checked;
      renderTasks();
    }
  }
}

// All this function does is cancel the edit and reloads the page
function cancelEdit(id) {
  renderTasks(); 
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
