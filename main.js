const form = document.querySelector('form');
const input = document.querySelector('input');
const ulList = document.querySelector('ul');
const emptyMessage = document.querySelector('.empty');
const tasksCounter = document.querySelector('.task-count span:last-child');

let tasks = [];
loadTasks();

function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  ulList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <p>${task}</p>
      <button class="btn-delete" data-index="${index}">x</button>
    `;
    ulList.appendChild(li);
  });

  if (tasks.length === 0) {
    emptyMessage.style.display = 'block';
  } else {
    emptyMessage.style.display = 'none';
  }

  tasksCounter.textContent = tasks.length;
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const task = input.value.trim();

  if (task !== '') {
    tasks.push(task);
    saveTasks();
    renderTasks();
    input.value = '';
  }
});

ulList.addEventListener('click', e => {
  if (e.target.classList.contains('btn-delete')) {
    const index = e.target.getAttribute('data-index');
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
});