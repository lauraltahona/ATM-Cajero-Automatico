

export function mostrarError(message, idError){
    const error = document.getElementById(idError)
    error.textContent = message

    setTimeout(() => {
        error.textContent = ""
    }, 3000)
}

export function obtenerVistaActiva(){
    return document.querySelector('.vista.activa')
}