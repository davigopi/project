function solicitarNotas() {
    const numEstudantes = parseInt(document.getElementById('numEstudantes').value);
    const notasContainer = document.getElementById('notasContainer');

    notasContainer.innerHTML = ''; 

    let i = 1;
    while (i <= numEstudantes) {
        const label = document.createElement('label');
        label.setAttribute('for', `nota${i}`);
        label.textContent = `Nota do ${i}º estudante:`;

        const input = document.createElement('input');
        input.setAttribute('type', 'number');
        input.setAttribute('id', `nota${i}`);
        input.setAttribute('step', '0.1');
        input.required = true;

        notasContainer.appendChild(label);
        notasContainer.appendChild(input);
        notasContainer.appendChild(document.createElement('br'));

        i++;
    }

    document.getElementById('entradaNotas').style.display = 'block';
}

function calcularEstatisticas() {
    const numEstudantes = parseInt(document.getElementById('numEstudantes').value);
    let somaNotas = 0;
    let maiorNota = -Infinity;
    let menorNota = Infinity;

    let i = 1;
    while (i <= numEstudantes) {
        const nota = parseFloat(document.getElementById(`nota${i}`).value);
        somaNotas += nota;

        if (nota > maiorNota) {
            maiorNota = nota;
        }

        if (nota < menorNota) {
            menorNota = nota;
        }

        i++;
    }

    const media = somaNotas / numEstudantes;

    document.getElementById('media').textContent = `Média da turma: ${media.toFixed(2)}`;
    document.getElementById('maiorNota').textContent = `Maior nota: ${maiorNota.toFixed(2)}`;
    document.getElementById('menorNota').textContent = `Menor nota: ${menorNota.toFixed(2)}`;
    document.getElementById('resultados').style.display = 'block';
}
