function calcularMediaPonderada() {
    // Obtendo os valores das notas e pesos do formulário
    const nota1 = parseFloat(document.getElementById('nota1').value);
    const peso1 = parseFloat(document.getElementById('peso1').value);
    const nota2 = parseFloat(document.getElementById('nota2').value);
    const peso2 = parseFloat(document.getElementById('peso2').value);
    const nota3 = parseFloat(document.getElementById('nota3').value);
    const peso3 = parseFloat(document.getElementById('peso3').value);

    // Verificando se todos os campos foram preenchidos corretamente
    if (isNaN(nota1) || isNaN(peso1) || isNaN(nota2) || isNaN(peso2) || isNaN(nota3) || isNaN(peso3)) {
        alert("Por favor, preencha todos os campos com valores numéricos.");
        return;
    }

    // Calculando a média ponderada
    const media = (nota1 * peso1 + nota2 * peso2 + nota3 * peso3) / (peso1 + peso2 + peso3);

    // Exibindo a média ponderada no console
    console.log("A média ponderada é:", media);
}
