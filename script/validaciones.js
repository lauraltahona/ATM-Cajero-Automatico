export function validarNequi(numero){
    return numero.startsWith('3')
}

export function validarAhorro(numero){
    const primero = parseInt(numero[0])
    const segundo = parseInt(numero[1])

    if(primero >= 2 && primero <= 9) return false
    if(segundo !== 3) return false
    
    return true
}

export function validarMonto(monto, tipo){
    if(monto < 10000) return "El monto mínimo es de 10.000."
    if(monto % 10000 !== 0) return "Solo múltiplos de 10.000."

    if(tipo === "NEQUI" && monto > 1000000){
        return "Monto máximo permitido: $1.000.000"
    }

    if((tipo === "AHORRO A LA MANO" || tipo === "CUENTA DE AHORROS") && monto > 2700000){
        return "Monto máximo permitido: $2.700.000"
    }
    
    return null
}

export function obtenerLimites(id) {
    if (id.includes("nequi-num")) return 10
    if (id.includes("clave")) return 6
    if (id.includes("ahorro-num")) return 11
    if (id.includes("pin")) return 4
    if (id.includes("cuenta-num")) return 11

    return 10
}