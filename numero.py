def main():
    numero1 = float(input("Digite o primeiro número: "))
    numero2 = float(input("Digite o segundo número: "))
    numero3 = float(input("Digite o terceiro número: "))

    maior_numero = max(numero1, numero2, numero3)
    menor_numero = min(numero1, numero2, numero3)

    numeros_iguais = []

    if numero1 == numero2:
        numeros_iguais.append(numero1)
        numeros_iguais.append(numero2)

    if numero1 == numero3:
        numeros_iguais.append(numero1)
        numeros_iguais.append(numero3)

    if numero2 == numero3:
        numeros_iguais.append(numero2)
        numeros_iguais.append(numero3)

    print("O maior número é:", maior_numero)
    print("O menor número é:", menor_numero)

    if len(numeros_iguais) > 0:
        print("Existem números iguais:", numeros_iguais)
    else:
        print("Não existem números iguais.")


if __name__ == "__main__":
    main()
