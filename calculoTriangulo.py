def calcular_area_retangulo(base, altura):
    area = base * altura
    return area


def main():
    base = float(input("Digite a base do retângulo: "))
    altura = float(input("Digite a altura do retângulo: "))

    area = calcular_area_retangulo(base, altura)

    print("A área do retângulo é:", area)


if __name__ == "__main__":
    main()
