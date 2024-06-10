def calcular_media_alunos():
    num_alunos = int(input("Digite a quantidade de alunos na turma: "))
    soma_idades = 0

    for i in range(num_alunos):
        idade = int(input(f"Digite a idade do aluno {i + 1}: "))
        soma_idades += idade

    contador = 0
    while num_alunos > 0:
        contador += 1
        num_alunos -= 1

    media_idade = soma_idades / contador

    print("A média de idade da turma é:", media_idade)


if __name__ == "__main__":
    calcular_media_alunos()
