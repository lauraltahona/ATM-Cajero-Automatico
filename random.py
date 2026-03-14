import random
import time
import getpass

# Función para calcular billetes (ya existente)
def calcular_billetes(monto):
    denominaciones = [100000, 50000, 20000, 10000]
    matriz_recorridos = [
        [1, 1, 1, 1],   # 180k
        [1, 1, 1, 0],   # 170k
        [1, 1, 0, 0],   # 150k
        [1, 0, 0, 0]    # 100k
    ]
    billetes = [0, 0, 0, 0]
    #variables de control
    acumulado = 0
    i = 0
    max_intentos = 100
    intentos = 0

    while acumulado < monto and intentos < max_intentos:
        intentos += 1
        recorrido = matriz_recorridos[i]
        monto_recorrido = sum(denominaciones[j] * recorrido[j] for j in range(4))
        
        if acumulado + monto_recorrido <= monto:
            acumulado += monto_recorrido
            for j in range(4):
                billetes[j] += recorrido[j]
            i = (i + 1) % 4
        else:
            i = (i + 1) % 4
            if i == 0:
                break

    if acumulado < monto:
        for j in range(4):
            while acumulado + denominaciones[j] <= monto:
                acumulado += denominaciones[j]
                billetes[j] += 1

    return billetes

# Función para validar montos
def validar_monto(monto):
    if monto % 10000 != 0:
        print("❌ Error: El monto debe ser múltiplo de 10.000 COP")
        return False
    return True

# Función para mostrar billetes
def mostrar_billetes(billetes):
    denominaciones = [100000, 50000, 20000, 10000]
    print("\n💵 Billetes a entregar:")
    for i in range(4):
        if billetes[i] > 0:
            print(f"   {billetes[i]} billete(s) de {denominaciones[i]:,} COP")

# 1. RETIRO POR CELULAR (Nequi)

import time

def retiro_nequi():
    print("\n📱 RETIRO POR CELULAR (Nequi)")
    print("=" * 40)
    
    # Validar número de celular (10 dígitos)
    while True:
        try:
            celular = input("Ingrese su número de celular (10 dígitos): ").strip()
            if len(celular) == 10 and celular.isdigit():
                break
            print("❌ Error: Debe ingresar exactamente 10 dígitos numéricos")
        except KeyboardInterrupt:
            print("\n\n❌ Operación cancelada por el usuario")
            return None
    
    # Generar clave temporal de 6 dígitos
    clave_temporal = str(random.randint(100000, 999999))
    tiempo_generacion = time.time()  # Marcar tiempo de generación
    
    print(f"\n🔑 Clave temporal: {clave_temporal}")
    print("⏰ Esta clave es válida por 60 segundos")
    
    # Generar nuevo número de 11 dígitos
    numero_11_digitos = "0" + celular
    print(f"✅ Número para retiro: {numero_11_digitos}")
    
    # Validar que la clave no haya expirado
    tiempo_actual = time.time()
    if tiempo_actual - tiempo_generacion > 60:
        print("❌ La clave ha expirado. Por favor inicie el proceso nuevamente.")
        return None
    
    print("💡 Clave válida. Continuando con el retiro...")
    return procesar_retiro()

# 2. RETIRO AHORRO A LA MANO
def retiro_ahorro_mano():
    print("\n💳 RETIRO AHORRO A LA MANO")
    print("=" * 40)
    
    # Validar número de 11 dígitos
    while True:
        numero = input("Ingrese número de 11 dígitos: ").strip()
        if len(numero) == 11 and numero.isdigit():
            if numero[0] in ['0', '1'] and numero[1] == '3':
                break
            else:
                print("❌ Error: El primer dígito debe ser 0 o 1, el segundo debe ser 3")
        else:
            print("❌ Error: Debe ingresar exactamente 11 dígitos numéricos")
    
    # Validar clave de 4 dígitos (no visible)
    clave = getpass.getpass("Ingrese su clave de 4 dígitos: ")
    while len(clave) != 4 or not clave.isdigit():
        print("❌ Error: La clave debe tener 4 dígitos")
        clave = getpass.getpass("Ingrese su clave de 4 dígitos: ")
    
    return procesar_retiro()

# 3. RETIRO POR CUENTA DE AHORROS
def retiro_cuenta_ahorros():
    print("\n🏦 RETIRO POR CUENTA DE AHORROS")
    print("=" * 40)
    
    # Validar número de cuenta (11 dígitos, 0-8)
    while True:
        cuenta = input("Ingrese número de cuenta (11 dígitos): ").strip()
        if len(cuenta) == 11 and cuenta.isdigit():
            if all(digito in '0123456789' for digito in cuenta):
                break
            else:
                print("❌ Error: Solo se permiten dígitos del 0 al 9")
        else:
            print("❌ Error: Debe ingresar exactamente 11 dígitos numéricos")
    
    # Validar clave de 4 dígitos (no visible)
    clave = getpass.getpass("Ingrese su clave de 4 dígitos: ")
    while len(clave) != 4 or not clave.isdigit():
        print("❌ Error: La clave debe tener 4 dígitos")
        clave = getpass.getpass("Ingrese su clave de 4 dígitos: ")
    
    return procesar_retiro()

# Procesar el retiro (común para los tres métodos)
def procesar_retiro():
    print("\n💰 MONTO A RETIRAR")
    print("=" * 40)
    print("Opciones rápidas:")
    print("1. $50,000")
    print("2. $100,000")
    print("3. $200,000")
    print("4. $500,000")
    print("5. Otro monto")
    
    while True:
        opcion = input("\nSeleccione una opción (1-5): ")
        
        if opcion == "1":
            monto = 50000
        elif opcion == "2":
            monto = 100000
        elif opcion == "3":
            monto = 200000
        elif opcion == "4":
            monto = 500000
        elif opcion == "5":
            try:
                monto = int(input("Ingrese el monto: "))
            except ValueError:
                print("❌ Error: Ingrese un número válido")
                continue
        else:
            print("❌ Error: Opción no válida")
            continue
        
        if validar_monto(monto):
            billetes = calcular_billetes(monto)
            mostrar_billetes(billetes)
            return monto
        else:
            print("❌ Intente nuevamente")


# Función principal
def main():
    retiros_realizados = []
    
    while True:
        print("\n" + "=" * 40)
        print("🏧 CAJERO AUTOMÁTICO")
        print("=" * 40)
        print("1. Retiro por celular (Nequi)")
        print("2. Retiro Ahorro a la Mano")
        print("3. Retiro por cuenta de ahorros")
        print("4. Ver reporte de retiros")
        print("5. Salir")
        
        opcion = input("\nSeleccione el tipo de retiro (1-5): ")
        
        if opcion == "1":
            monto = retiro_nequi()
            if monto is not None:
                retiros_realizados.append(("Nequi", monto))
                print(f"\n✅ Retiro exitoso de ${monto:,} COP")
                input("Presione Enter para continuar...")
                
        elif opcion == "2":
            monto = retiro_ahorro_mano()
            if monto is not None:
                retiros_realizados.append(("Ahorro a la Mano", monto))
                print(f"\n✅ Retiro exitoso de ${monto:,} COP")
                input("Presione Enter para continuar...")
                
        elif opcion == "3":
            monto = retiro_cuenta_ahorros()
            if monto is not None:
                retiros_realizados.append(("Cuenta Ahorros", monto))
                print(f"\n✅ Retiro exitoso de ${monto:,} COP")
                input("Presione Enter para continuar...")
                
        elif opcion == "4":
            mostrar_reporte(retiros_realizados)
            input("Presione Enter para continuar...")
            
        elif opcion == "5":
            break
            
        else:
            print("❌ Opción no válida")
            input("Presione Enter para continuar...")

    # Mostrar reporte final al salir
    mostrar_reporte(retiros_realizados)
    print("¡Gracias por usar nuestro cajero automático! 👋")

# Función para mostrar reporte
def mostrar_reporte(retiros_realizados):
    print("\n" + "=" * 40)
    print("📊 REPORTE DE RETIROS")
    print("=" * 40)
    total_retiros = len(retiros_realizados)
    
    if total_retiros == 0:
        print("No se han realizado retiros")
        return
        
    print(f"Total de retiros realizados: {total_retiros}")
    
    for i, (tipo, monto) in enumerate(retiros_realizados, 1):
        print(f"{i}. {tipo}: ${monto:,} COP")
    
    total_montos = sum(monto for _, monto in retiros_realizados)
    print(f"\n💰 Total retirado: ${total_montos:,} COP")
    print(f"🎯 Puede realizar hasta {10 - total_retiros} retiros más hoy")
# Ejecutar el programa
if __name__ == "__main__":
    main()