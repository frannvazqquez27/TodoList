const formulario = document.querySelector('form');
const entrada = document.querySelector('input');
const listaUl = document.querySelector('ul');
const vacio = document.querySelector('.empty');
const contadorTareas = document.querySelector('.task-count span:last-child');

let tareas = [];
cargarTareas();

function cargarTareas() {
  const tareasAlmacenadas = localStorage.getItem('tareas');
  if (tareasAlmacenadas) {
    tareas = JSON.parse(tareasAlmacenadas);
    renderizarTareas();
  }
}

function guardarTareas() {
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

function renderizarTareas() {
  listaUl.innerHTML = '';
  tareas.forEach((tarea, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <p>${tarea}</p>
      <button class="btn-delete" data-index="${index}">x</button>
    `;
    listaUl.appendChild(li);
  });

  if (tareas.length === 0) {
    vacio.style.display = 'block';
  } else {
    vacio.style.display = 'none';
  }

  contadorTareas.textContent = tareas.length;
}

formulario.addEventListener('submit', e => {
  e.preventDefault();

  const tarea = entrada.value.trim();

  if (tarea !== '') {
    tareas.push(tarea);
    guardarTareas();
    renderizarTareas();
    entrada.value = '';
  }
});

listaUl.addEventListener('click', e => {
  if (e.target.classList.contains('btn-delete')) {
    const index = e.target.getAttribute('data-index');
    tareas.splice(index, 1);
    guardarTareas();
    renderizarTareas();
  }
});