const form = document.querySelector("form")
const input = document.querySelector("#inputTareas")
const boton = document.querySelector("button")
const tareas = document.querySelector(".tareas")
const ul = document.querySelector("ul")
const msg = document.querySelector(".msg")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let texto = input.value;

    if (texto !== "") {
        let li = document.createElement("li")
        let p = document.createElement("p")

        p.textContent = texto

        li.appendChild(p)
        ul.appendChild(li)
        li.appendChild(agregarBotonBorrado())

        input.value = ""
        msg.style.display = "none"
    }
})

function agregarBotonBorrado() {
    let deleteButton = document.createElement("button")

    deleteButton.textContent = "X"
    deleteButton.className = "deleteButton"

    deleteButton.addEventListener("click", (e) => {
        const item = e.target.parentElement
        ul.removeChild(item)

        const items = document.querySelectorAll("li")

        if (items.length === 0) {
            msg.style.display = "block"
        }
    })
    return deleteButton
}