
//cambiar vista en la pantalla
function cambiarVista(id){
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

let valorActual = ""
const botones = document.querySelectorAll('.numeros-teclado button')

function obtenerDisplayActivo(){
    const vista = obtenerVistaActive()
    return vista.querySelector(".display")
}

botones.forEach(boton => {
    boton.addEventListener("click", ()=>{
        const valor = boton.textContent.trim()
        if (!valor) return

        manejarEntrada(valor)
    })
})

function manejarEntrada(valor){
    const vista = obtenerVistaActive()
    const error = vista.querySelector(".error")
    const display = obtenerDisplayActivo()

    if(!isNaN(valor)){
        if (valorActual.length < obtenerLimite()){
            valorActual += valor
        }
    }

    if(valor === '←'){
        valorActual = valorActual.slice(0, -1) // extraer desde el inicio hastta antes del final, ej: 12345 -> 1234
    }

    if(display){
        display.textContent = valorActual
    }

    if(error){
        error.textContent = ""
    }
}


function obtenerVistaActive(){
    return document.querySelector('.vista.activa')
}

document.getElementById('verde').addEventListener("click", validarEntrada)

function validarEntrada(){
    const vista = obtenerVistaActive()
    const idVista = vista.id

    if(idVista === 'vista-nequi-num'){
        if(valorActual.length !== 10){
            mostrarError("Debe tener 10 digitos", "error-numero")
            return
        }
        cambiarVista("vista-nequi-clave")
    }

    else if(idVista === "vista-nequi-clave"){
        if(valorActual.length !== 6){
            mostrarError("Clave incorrecta (6 dígitos)", "error-clave")
            return
        }
        cambiarVista("vista-monto")
    }

    // AHORRO número
    else if(idVista === "vista-ahorro-num"){
        if(valorActual.length !== 11){
            mostrarError("Debe tener 11 dígitos", "error-ahorro-num")
            return
        }
        cambiarVista("vista-ahorro-pin")
    }

    // AHORRO clave
    else if(idVista === "vista-ahorro-pin"){
        if(valorActual.length !== 4){
            mostrarError("Clave de 4 dígitos", "error-ahorro-clave")
            return
        }
        cambiarVista("vista-monto")
    }

    // CUENTA número
    else if(idVista === "vista-cuenta-num"){
        if(valorActual.length !== 11){
            mostrarError("Cuenta inválida", "error-cuenta-num")
            return
        }
        cambiarVista("vista-cuenta-pin")
    }

    // CUENTA clave
    else if(idVista === "vista-cuenta-pin"){
        if(valorActual.length !== 4){
            mostrarError("Clave incorrecta", "error-cuenta-clave")
            return
        }
        cambiarVista("vista-monto")
    }

}

function obtenerLimite(){
    const id = obtenerVistaActive().id

    if(id.includes("nequi-num")) return 10
    if(id.includes("clave")) return 6
    if(id.includes("ahorro-num")) return 11
    if(id.includes("pin")) return 4
    if(id.includes("cuenta-num")) return 11

    return 10
}


function mostrarError(message, idError){
    const error = document.getElementById(idError)
    error.textContent = message

    setTimeout(() => {
        error.textContent = ""
    }, 3000)


}