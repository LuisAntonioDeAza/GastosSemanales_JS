const formulario = document.querySelector("#agregar-gasto");
const listadoGasto = document.querySelector("#gastos ul");
const colPrimaria = document.querySelector("#p");

let presupuest;
let ui;

EventListener();
function EventListener() {
    document.addEventListener("DOMContentLoaded", () => {
        const preguntaPresupuesto = prompt("Cual es tu presupuesto?");
        if (preguntaPresupuesto === "" || preguntaPresupuesto === null || isNaN(preguntaPresupuesto) || preguntaPresupuesto < 0) {
            window.location.reload();
        }

        presupuest = new Presupuesto(Number(preguntaPresupuesto));
        ui.ingresarPresupuesto(presupuest);
    });

    formulario.addEventListener("submit", validarCampos);
}

//Clases
class Presupuesto {

    constructor(Presupuesto) {
        this.Presupuesto = Number(Presupuesto);
        this.Restante = Number(Presupuesto);
        this.Gastos = [];
    }

    nuevoGasto(gasto) {
        this.Gastos = [...this.Gastos, gasto];
        this.restate();
    }

    restate() {
            const gastado = this.Gastos.reduce( (total, gastos) => total + gastos.cantidad, 0);
            this.Restante = this.Presupuesto - gastado;
    }
}

class UI {
    ingresarPresupuesto(cantidad) {
        const { Presupuesto, Restante } = cantidad;
        const total = (document.querySelector("#total").textContent = Presupuesto);
        const restant = (document.querySelector("#restante").textContent = Restante);
    }

    imprimirError(mensje, error) {

        if (colPrimaria.children[1].classList.contains("alert")) {
            colPrimaria.children[1].remove();
        }

        const divError = document.createElement("div");
        divError.classList.add("text-center", "alert", error);
        divError.textContent = mensje;
        document.querySelector(".primario").insertBefore(divError, formulario);
    }

    listaGasto(valor) {
        
        //Limpiar el html para que los elementos DOM agregados no se repitan
        while (listadoGasto.lastChild) {
            listadoGasto.lastChild.remove();
        }

            valor.forEach((gastos) => {
            const { gasto, cantidad, id } = gastos;
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between aling-items-center";
            li.dataset.id = id;
            li.innerHTML = `${gasto} <span class="badge badge-primary">${cantidad}</span>`;
            const btns = document.createElement("button");
            btns.classList.add("btn", "btn-danger", "borrar-gastos");
            btns.innerHTML = "borrar &times;";
            li.appendChild(btns);
            listadoGasto.appendChild(li);
        });
    }

    altualizarRestante(restan) {
        const restant = (document.querySelector("#restante").textContent = restan);
    }

    comprobarPresupuesot(presupuestoOBJ){

        const {Presupuesto, Restante } =presupuestoOBJ;
        const restantediv = document.querySelector('.restante');
        if((Presupuesto / 4) > Restante){
            restantediv.classList.remove('alert-success');
            restantediv.classList.add('alert-danger');
            
        }else if((Presupuesto /2 ) > 2){
            restantediv.classList.remove('alert-success');
            restantediv.classList.add('alert-warning');
        }

        if(Restante <= 0){
            ui.imprimirError("Se agoto el presupuesto", "alert-danger");
            formulario.querySelector('button[type="submit"]').disabled = true;
        }
    }
}

ui = new UI();
presupuest = new Presupuesto();

//funciones
function validarCampos(e) {
    e.preventDefault();

    const gasto = document.querySelector("#gasto").value;
    const cantidad = Number(document.querySelector("#cantidad").value);

    if (gasto === "" || cantidad === "" || cantidad < 1) {
        ui.imprimirError("Compos vacios", "alert-danger");
        return;
    } else {
        ui.imprimirError("Gasto agreado con exito", "alert-success");
    }

    const gastos = { gasto, cantidad, id: Date.now() };
    presupuest.nuevoGasto(gastos);

    const { Gastos, Restante } = presupuest;
    ui.listaGasto(Gastos);
    ui.altualizarRestante(Restante);
    ui.comprobarPresupuesot(presupuest);
    
    formulario.reset();
}

function ReiniciarCampos(){

    const gasto = document.querySelector("#gasto").value;
    const cantidad = Number(document.querySelector("#cantidad").value);

    gasto == '';
    cantidad == 0;
}