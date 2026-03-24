let claveTemporal = ""
let tiempoClave = 60
let intervaloClave = null

function generarClave(){
    return Math.floor(100000 + Math.random() * 900000).toString()
}

export function iniciarClaveTemporal(){

    // Limpiar si ya había un contador
    clearInterval(intervaloClave)

    claveTemporal = generarClave()
    tiempoClave = 60

    document.getElementById("clave-generada").textContent = claveTemporal

    intervaloClave = setInterval(() => {
        tiempoClave--

        console.log("Tiempo:", tiempoClave)
         document.getElementById("tiempo-clave").textContent = tiempoClave

        if(tiempoClave <= 0){
            clearInterval(intervaloClave)
            iniciarClaveTemporal()
        }

    }, 1000)

    document.getElementById("tiempo-clave").textContent = ""
}

export function obtenerClaveTemporal(){
    return claveTemporal
}

export function limpiarClave(){
    claveTemporal = ""
    clearInterval(intervaloClave)
}

export function obtenerIntervaloClave(){
    return intervaloClave
}