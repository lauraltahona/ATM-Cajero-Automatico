

let dinero = [10, 20, 50, 100]
let valor = 250
let retiro = []
let total = 0
let carry = 0

while (total !== valor){

    for (let i=carry; i < dinero.length; i++){
        if (dinero[i] + total <= valor){
            console.log("total es menor a valor todavia");
            
            retiro.push(dinero[i])
            total += dinero[i]
            console.log(dinero[i]);
            
        }
    }
    
    carry = carry > 4 ? 0 : carry + 1
    
}

console.log(retiro);
console.log("total: "+ total);

