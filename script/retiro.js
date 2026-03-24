
export function retiroDinero(valor){

    let dinero = [10000, 20000, 50000, 100000]
    let total = 0
    let retiro = []
    let carry = 0

    while (total !== valor){

        for(let i=carry; i < dinero.length; i++){

            if(dinero[i] + total <= valor){
                total += dinero[i]
                retiro.push(dinero[i])
            }

        }

        carry = carry > 4 ? 0 : carry + 1
    }

    return retiro
    
}




