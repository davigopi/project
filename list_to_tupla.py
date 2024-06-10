def calcular_media_alunos():
    lista1 = input("Digite os elementos da primeira lista separados por espaço: ").split()
    lista2 = input("Digite os elementos da segunda lista separados por espaço: ").split()

    elementos_lista1 = [int(num) if num.isdigit() else num for num in lista1]
    elementos_lista2 = [int(num) if num.isdigit() else num for num in lista2]

    elementos_comuns_numericos = set(
        [int(num) for num in elementos_lista1 if isinstance(num, int) and num in elementos_lista2])
    elementos_comuns_strings = set(
        [string for string in elementos_lista1
         if isinstance(string, str) and string in elementos_lista2])
    elementos_comuns = elementos_comuns_numericos.union(elementos_comuns_strings)

    if elementos_comuns_numericos:
        soma_elementos_numericos = sum(elementos_comuns_numericos)
    else:
        soma_elementos_numericos = 0

    return tuple(elementos_comuns), soma_elementos_numericos


if __name__ == "__main__":
    resultado, soma = calcular_media_alunos()
    print("Elementos em comum:", resultado)
    print("Soma dos elementos numéricos em comum:", soma)
