// Array to store tasks
let tasks = [];

// DOM Elements
const taskInput = document.getElementById("taskInput");
const taskTime = document.getElementById("taskTime");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Add Task Button Click Event
addTaskButton.addEventListener("click", () => {
  const taskName = taskInput.value.trim();
  const taskTimeValue = taskTime.value;

  if (taskName && taskTimeValue) {
    const task = { name: taskName, time: taskTimeValue };
    tasks.push(task);
    displayTasks();
    scheduleTaskReminder(task);
    taskInput.value = "";
    taskTime.value = "";
  } else {
    alert("Please enter a task name and time.");
  }
});

// Function to Display Tasks
function displayTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span>${task.name} (<span class="task-time">${task.time}</span>)</span>
      <button onclick="removeTask(${index})">Remove</button>
    `;
    taskList.appendChild(listItem);
  });
}

// Function to Schedule Task Reminder
function scheduleTaskReminder(task) {
  const now = new Date();
  const taskTimeParts = task.time.split(":");
  const taskDateTime = new Date();
  taskDateTime.setHours(taskTimeParts[0], taskTimeParts[1], 0, 0);

  const delay = taskDateTime - now;
  if (delay > 0) {
    setTimeout(() => {
      alert(`Reminder: It's time to complete your task: "${task.name}"`);
    }, delay);
  }
}

// Function to Remove Task
function removeTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}
