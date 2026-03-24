import { retiroDinero } from "./retiro.js";

export function prediccionCajero(valor, numRetiros) {

    const retiro = retiroDinero(valor);

    // Contar cuántos billetes de cada denominación salieron
    const conteo = {};

    for (const billete of retiro) {
        if (conteo[billete] === undefined) {
            conteo[billete] = 0;
        }

        conteo[billete] = conteo[billete] + 1;
    } 

    const prediccion = {};
    for (const denominacion in conteo) {

        prediccion[denominacion] = conteo[denominacion] * numRetiros;
    }

    return prediccion;
}

// esta funcion debería ir en una capa UI
export function mostrarPrediccion(monto, numRetiros){
    console.log(monto);
    
    const resultado = prediccionCajero(monto, numRetiros)

    const contenedor = document.getElementById("prediccion-billetes")
    contenedor.innerHTML = ""

    const p1 = document.createElement('p')
    p1.style.marginBottom = "10px"
    p1.style.color = "#ffb800"
    p1.textContent = `CANTIDAD DE RETIROS ESTIMADOS: ${numRetiros}`

    contenedor.appendChild(p1)
    for (let billete in resultado){
        const p = document.createElement("p")

        p.textContent = `${resultado[billete]} billetes de $${parseInt(billete).toLocaleString()}`
        contenedor.appendChild(p)
    }
}
