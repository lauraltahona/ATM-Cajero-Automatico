export function agruparBilletes(billetes){
    const conteo = {}

    billetes.forEach(b => {
        conteo[b] = (conteo[b] || 0) + 1
    })

    return conteo
}

export function mostrarComprobante({ monto, tipo, numero, billetes }){

    document.getElementById("recibo-monto").textContent = "$ Monto " + monto
    document.getElementById("recibo-tipo").textContent = tipo
    document.getElementById("recibo-numero").textContent = numero.join('')

    const contenedor = document.getElementById("recibo-billetes")
    contenedor.innerHTML = ""

    const agrupados = agruparBilletes(billetes)

    for (let valor in agrupados) {
        const p = document.createElement("p")
        p.textContent = `${agrupados[valor]} x $${parseInt(valor).toLocaleString()}`
        contenedor.appendChild(p)
    }
}