import random


def jogo_de_adivinhacao():
    numero_secreto = random.randint(1, 10)
    tentativas_restantes = 3

    print("Bem-vindo ao jogo de adivinhação!")
    print("Tente adivinhar um número entre 1 e 10.")

    while tentativas_restantes > 0:
        tentativa = int(input("Digite sua tentativa: "))

        if tentativa == numero_secreto:
            print(f"Parabéns! Você acertou o número. O número é: {numero_secreto}.")
            break
        else:
            tentativas_restantes -= 1
            if tentativas_restantes > 0:
                print(f"Tente novamente! Você tem {tentativas_restantes} tentativa(s) restante(s).")
            else:
                print(f"Suas tentativas acabaram. O número correto era: {numero_secreto}.")
    else:
        print("Fim do jogo.")


if __name__ == "__main__":
    jogo_de_adivinhacao()
