algoritmo MostrarNumerosPares
    inteiro numero, contador

    para contador de 1 ate 5 faca
        escreva("Digite o ", contador, "º número entre 0 e 10: ")
        leia(numero)
        
        se (numero >= 0 e numero <= 10 e numero % 2 == 0) entao
            escreva(numero, " é um número par.\n")
        fimse
    fimpara

    escreva("Fim do programa.")
fimalgoritmo