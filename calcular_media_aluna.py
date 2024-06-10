def calcular_media_alunos():
    num_alunos = int(input("Digite o número de alunos: "))
    soma_medias = 0

    for i in range(num_alunos):
        nome_aluno = input(f"Digite o nome do aluno {i + 1}: ")
        nota1 = float(input("Digite a primeira nota: "))
        nota2 = float(input("Digite a segunda nota: "))
        nota3 = float(input("Digite a terceira nota: "))
        media = (nota1 + nota2 + nota3) / 3
        soma_medias += media

        if media >= 7.0:
            situacao = "Aprovado"
        else:
            situacao = "Reprovado"

        print(f"\nAluno: {nome_aluno}")
        print(f"Notas: {nota1}, {nota2}, {nota3}")
        print(f"Média: {media}")
        print(f"Situação: {situacao}")

    media_geral = soma_medias / num_alunos
    media_geral_arredondada = round(media_geral, 1)
    print(f"\nMédia geral da turma: {media_geral_arredondada}")


if __name__ == "__main__":
    calcular_media_alunos()
