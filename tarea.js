class Tarea {
    constructor() {
        this.conteiner = document.querySelector(".tareas")
    }

    popular(datos, id) {
        let nuevaTarea = {
            id: id,
            tarea: datos,
            done: false
        }

        tareas.push(nuevaTarea)


    }
}