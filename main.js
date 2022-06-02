const form = document.querySelector("form");
const input = document.querySelector("#inputTareas");
const boton = document.querySelector("button");
const tareas = document.querySelector(".tareas");
const ul = document.querySelector("ul");
const msg = document.querySelector(".msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let texto = input.value;

  if (texto !== "") {
    let li = document.createElement("li");
    let p = document.createElement("p");

    p.textContent = texto;

    li.appendChild(p);
    ul.appendChild(li);
    li.appendChild(agregarBotonBorrado());

    if (ul.children.length === 1 && tareas.children.length === 1) {
      tareas.appendChild(borrarTodos());
    }

    input.value = "";
    msg.style.display = "none";
  }
});

function agregarBotonBorrado() {
  let deleteButton = document.createElement("button");

  deleteButton.textContent = "X";
  deleteButton.className = "deleteButton";

  deleteButton.addEventListener("click", (e) => {
    const item = e.target.parentElement;
    ul.removeChild(item);

    if (document.querySelectorAll("li").length === 0) {
      msg.style.display = "block";
      tareas.removeChild(tareas.lastElementChild);
    }
  });
  return deleteButton;
}

function borrarTodos() {
  let borrarTodos = document.createElement("button");

  borrarTodos.className = "botonBorrarTodo";
  borrarTodos.textContent = "Borrar todas las tareas";

  borrarTodos.addEventListener("click", () => {
    do {
      ul.removeChild(ul.firstChild);
    } while (ul.children.length !== 0);

    if (document.querySelectorAll("li").length === 0) {
      tareas.removeChild(borrarTodos);
      msg.style.display = "block";
    } else {
      borrarTodos.style.display = "block";
    }
  });
  return borrarTodos;
}
