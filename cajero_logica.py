
dinero = [10, 20, 50, 100]
retiro = []
valor = 200 # valor que se quiere retirar, siempre multiplos de 10
total = 0

i=0

while total != valor:

    if(dinero[i] + total <= valor):
        retiro.append(dinero[i])
        total += dinero[i]
        i += 1
    else:
        i -= 1

    if(total != valor and i == 4):
        i -= 1

    

print(f"Los billetes que les fueron dados: {retiro}")
print(f"Monto total: {total}")

