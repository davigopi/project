def verificar_numero(n):
    if n > 0:
        print(f"O número {n} é positivo.")
    elif n < 0:
        print(f"O número {n} é negativo.")
    else:
        print("O número é zero.")


def main():
    numero = float(input("Digite um número: "))
    verificar_numero(numero)


if __name__ == "__main__":
    main()
