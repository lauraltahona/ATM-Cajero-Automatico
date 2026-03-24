import { retiroDinero } from "./retiro.js"
import { iniciarClaveTemporal, obtenerClaveTemporal, limpiarClave, obtenerIntervaloClave } from "./claveTemporal.js"
import { validarAhorro, validarNequi, validarMonto, obtenerLimites } from "./validaciones.js"
import { mostrarComprobante } from "./comprobante.js"
import { mostrarError, obtenerVistaActiva } from "./ui.js"
import { mostrarPrediccion } from "./prediccion.js"

let valorActual = ""
let montoSeleccionado = 0
let modoOtroMonto = false
let tipoRetiro = ""
let numeroUsuario = ""



document.querySelectorAll('[data-monto]').forEach(btn => {
    btn.addEventListener('click', () => {
        montoSeleccionado = parseInt(btn.getAttribute('data-monto'))

        // Ir directo al comprobante (o después puedes meter validaciones)
        generarRetiro()
    })
})

function generarRetiro() {

    let billetes = retiroDinero(montoSeleccionado)

    animarBilletes(billetes)

    mostrarComprobante({
        monto: montoSeleccionado,
        tipo: tipoRetiro,
        numero: numeroUsuario,
        billetes
    })
    
    cambiarVista("vista-comprobante")
}


function obtenerDisplayActivo() {
    if (modoOtroMonto) {
        return document.getElementById("display-monto")
    }

    const vista = obtenerVistaActiva()
    return vista.querySelector(".display")
}


document.getElementById("btn-otro").addEventListener("click", () => {
    document.getElementById("otro-monto").style.display = "block"

    const display = document.getElementById("display-monto")
    display.textContent = "Escriba el monto"

    valorActual = ""
    modoOtroMonto = true
})

//cambiar vista en la pantalla
function cambiarVista(id) {
    const vistas = document.querySelectorAll('.vista')

    vistas.forEach(v => {
        v.classList.remove('activa')
    })

    document.getElementById(id).classList.add('activa')

    valorActual = ""
    document.querySelectorAll(".display").forEach(d => {
        d.textContent = ""
    })

}

// ── Conectar botones con data-vista ──
document.querySelectorAll('[data-vista]').forEach(btn => {
    btn.addEventListener('click', () => {
        const destino = btn.getAttribute('data-vista');
        cambiarVista(destino);
    });
});

const botones = document.querySelectorAll('.numeros-teclado button')
botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const valor = boton.textContent.trim()
        if (!valor) return

        manejarEntrada(valor)
    })
})

function manejarEntrada(valor) {
    const vista = obtenerVistaActiva()
    const error = vista.querySelector(".error")
    const display = obtenerDisplayActivo()

    if (!isNaN(valor)) {
        if (valorActual.length < obtenerLimite()) {
            valorActual += valor
        }
    }

    if (valor === '←') {
        valorActual = valorActual.slice(0, -1) // extraer desde el inicio hastta antes del final, ej: 12345 -> 1234
    }

    if (display) {
        display.textContent = valorActual
    }

    if (error) {
        error.textContent = ""
    }
}


document.getElementById('verde').addEventListener("click", validarEntrada)

function validarEntrada() {
    const vista = obtenerVistaActiva()
    const idVista = vista.id
    const clave = obtenerClaveTemporal()

    if (modoOtroMonto) {

        const monto = parseInt(valorActual)

        if (!monto) {
            mostrarError("Ingrese un monto válido.", "error-monto")
            return
        }

        const error = validarMonto(monto, tipoRetiro)
        if(error){
            mostrarError(error, "error-monto")
            return
        }

        montoSeleccionado = parseInt(valorActual)
        modoOtroMonto = false

        generarRetiro()
        return
    }


    if (idVista === 'vista-nequi-num') {
        if (valorActual.length !== 10) {
            mostrarError("Debe tener 10 digitos", "error-numero")
            return
        }

        if(!validarNequi(valorActual)){
            mostrarError("El número debe iniciar en 3", "error-numero")
            return
        }

        tipoRetiro = "NEQUI"
        numeroUsuario = (valorActual).split('').map(Number)

        cambiarVista("vista-nequi-clave")
        iniciarClaveTemporal()
    }

    else if (idVista === "vista-nequi-clave") {
        if (clave === "") {
            mostrarError("Clave expirada", "error-clave")
            return
        }

        if (valorActual !== clave) {
            mostrarError("Clave incorrecta", "error-clave")
            return
        }

        limpiarClave()

        cambiarVista("vista-monto")
    }

    // AHORRO número
    else if (idVista === "vista-ahorro-num") {
        if (valorActual.length !== 11) {
            mostrarError("Debe tener 11 dígitos", "error-ahorro-num")
            return
        }

        if(!validarAhorro(valorActual)){
            mostrarError("El número no cumple las reglas de ahorro", "error-ahorro-num")
            return
        }
        
        tipoRetiro = "AHORRO A LA MANO"
        numeroUsuario = (valorActual).split('').map(Number)
        cambiarVista("vista-ahorro-pin")
    }

    // AHORRO clave
    else if (idVista === "vista-ahorro-pin") {
        if (valorActual.length !== 4) {
            mostrarError("Clave de 4 dígitos", "error-ahorro-clave")
            return
        }
        cambiarVista("vista-monto")
    }

    // CUENTA número
    else if (idVista === "vista-cuenta-num") {
        if (valorActual.length !== 11) {
            mostrarError("Cuenta inválida", "error-cuenta-num")
            return
        }

        tipoRetiro = "CUENTA DE AHORROS"
        numeroUsuario = (valorActual).split('').map(Number)

        cambiarVista("vista-cuenta-pin")
    }

    // CUENTA clave
    else if (idVista === "vista-cuenta-pin") {
        if (valorActual.length !== 4) {
            mostrarError("Clave incorrecta", "error-cuenta-clave")
            return
        }
        cambiarVista("vista-monto")
    }

}

function obtenerLimite() {
    const id = obtenerVistaActiva().id

    const limite = obtenerLimites(id)
    return limite
}

document.getElementById("btn-prediccion").addEventListener("click", () => {
    cambiarVista("vista-prediccion")

    mostrarPrediccion(990000, 100) 
})

function animarBilletes(billetes){
    const ranura = document.querySelector(".ranura-dinero")

    billetes.forEach((b, index) => {
        setTimeout(() => {
            const div = document.createElement("div")
            div.classList.add("billete-animado")
            ranura.appendChild(div)

            setTimeout(() => {
                div.remove()
            }, 500)

        }, index * 300)
    })
}