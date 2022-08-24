const form = document.querySelector("form");
const input = document.querySelector("#inputTareas");
const boton = document.querySelector("button");
const tareas = document.querySelector(".tareas");
const ul = document.querySelector("ul");
const msg = document.querySelector(".msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  agregarItem();
});

const agregarItem = (item) => {
  let texto = item ? item : input.value;

  if (texto !== "" && texto !== null && texto !== undefined) {
    let li = document.createElement("li");
    let p = document.createElement("p");

    p.textContent = texto;

    !item && addToLocalStorage(texto);

    li.appendChild(p);
    ul.appendChild(li);
    li.appendChild(agregarBotonBorrado());

    if (ul.children.length === 1 && tareas.children.length === 1) {
      tareas.appendChild(borrarTodos());
    }

    input.value = "";
    msg.style.display = "none";
  }
};

function agregarBotonBorrado() {
  let deleteButton = document.createElement("button");

  deleteButton.textContent = "X";
  deleteButton.className = "deleteButton";

  deleteButton.addEventListener("click", (e) => {
    const item = e.target.parentElement;
    ul.removeChild(item);

    borrarDeLocalStorage(item.firstChild.innerHTML);

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
      borrarDeLocalStorage(ul.firstChild.firstChild.innerHTML);
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

const addToLocalStorage = (item) => {
  if (localStorage.getItem("lista")) {
    const lista = JSON.parse(localStorage.getItem("lista"));

    lista.push(item);

    localStorage.setItem("lista", JSON.stringify(lista));
  } else {
    localStorage.setItem("lista", JSON.stringify([item]));
  }
};

const borrarDeLocalStorage = (item) => {
  const lista = JSON.parse(localStorage.getItem("lista"));

  const index = lista.indexOf(item);

  if (index !== -1) {
    lista.splice(index, 1);
    localStorage.setItem("lista", JSON.stringify(lista));
  }
};

const checkLocalStorage = () => {
  if (localStorage.getItem("lista")) {
    const lista = JSON.parse(localStorage.getItem("lista"));

    if (lista.length >= 0) {
      for (let index = 0; index < lista.length; index++) {
        const element = lista[index];
        agregarItem(element);
      }
    }
  }
};

window.onload = () => {
  checkLocalStorage();
};
