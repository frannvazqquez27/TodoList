document.addEventListener("DOMContentLoaded", function () {
  const ENTRADA_TAREA = document.querySelector("input");
  const BOTON_AGREGAR_TAREA = document.querySelector("button");
  const CONTADOR_TAREAS = document.querySelector("span:nth-child(2)");
  const SIN_TAREAS = document.querySelector("p");
  const LISTA_DE_TAREAS = document.querySelector("ul");

  if (typeof Storage !== "undefined") {
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.forEach((tarea, index) => {
      const elementoTarea = document.createElement("li");
      elementoTarea.innerHTML = `
        ${tarea}
        <button class="delete" data-index="${index}">x</button>
      `;
      LISTA_DE_TAREAS.appendChild(elementoTarea);

      elementoTarea.querySelector("button.delete").addEventListener("click", function () {
        const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
        tareas.splice(index, 1);
        localStorage.setItem("tareas", JSON.stringify(tareas));
        LISTA_DE_TAREAS.innerHTML = "";
        tareas.forEach((tarea, i) => {
          const elementoTarea = document.createElement("li");
          elementoTarea.innerHTML = `
            ${tarea}
            <button class="delete" data-index="${i}">x</button>
          `;
          LISTA_DE_TAREAS.appendChild(elementoTarea);
        });
        actualizarContadorTareas();
        alternarTextoSinTareas();
      });
    });

    actualizarContadorTareas();
    alternarTextoSinTareas();
  }

  BOTON_AGREGAR_TAREA.addEventListener("click", function () {
    const textoTarea = ENTRADA_TAREA.value.trim();
    if (textoTarea !== "") {
      const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
      tareas.push(textoTarea);
      localStorage.setItem("tareas", JSON.stringify(tareas));
      const index = tareas.length - 1;
      const elementoTarea = document.createElement("li");
      elementoTarea.innerHTML = `
        ${textoTarea}
        <button class="delete" data-index="${index}">x</button>
      `;
      LISTA_DE_TAREAS.appendChild(elementoTarea);
      ENTRADA_TAREA.value = "";
      actualizarContadorTareas();
      alternarTextoSinTareas();
    }
  });

  function actualizarContadorTareas() {
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    CONTADOR_TAREAS.textContent = tareas.length;
  }

  function alternarTextoSinTareas() {
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    SIN_TAREAS.style.display = tareas.length === 0 ? "block" : "none";
  }
});