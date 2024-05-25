function calcularIMC() {
    // Obtendo os dados do formulário
    const nome = document.getElementById('nome').value;
    const alturaCm = parseFloat(document.getElementById('altura').value);
    const peso = parseFloat(document.getElementById('peso').value);

    // Convertendo altura de centímetros para metros
    const alturaM = alturaCm / 100;

    // Calculando o IMC
    const imc = peso / (alturaM * alturaM);
    
    // Classificando o peso com base no IMC
    let classificacao;
    let informacao;
    let pesoNormal;
    let peso1;
    let peso2;
    peso1 = 18.5 * (alturaM * alturaM);
    peso2 = 24.99 * (alturaM * alturaM);
    pesoNormal = peso1.toFixed(1).toString() + ' até ' + peso2.toFixed(1).toString();
    if (imc < 16) {
        classificacao = "Baixo peso muito grave";
        informacao = "Indica que a pessoa está muito abaixo do peso considerado saudável para sua altura. Geralmente, isso está associado a desnutrição grave ou outros problemas de saúde graves.";
    } else if (imc >= 16 && imc <= 16.99) {
        classificacao = "Baixo peso grave";
        informacao = "Indica que a pessoa está significativamente abaixo do peso considerado saudável para sua altura. Isso pode ser causado por subnutrição ou certas condições médicas.";
    } else if (imc >= 17 && imc <= 18.49) {
        classificacao = "Baixo peso";
        informacao = "Indica que a pessoa está abaixo do peso considerado saudável para sua altura, mas não tão drasticamente quanto as categorias anteriores. Pode ser resultado de uma dieta inadequada ou de certas condições médicas.";
    } else if (imc >= 18.5 && imc <= 24.99) {
        classificacao = "Peso normal";
        informacao = "Indica que a pessoa está dentro da faixa de peso considerada saudável para sua altura. Isso sugere um bom equilíbrio entre altura e peso, o que geralmente está associado a um menor risco de problemas de saúde relacionados ao peso.";        
    } else if (imc >= 25 && imc <= 29.99) {
        classificacao = "Sobrepeso";
        informacao = "Indica que a pessoa está acima do peso considerado saudável para sua altura. Isso pode aumentar o risco de certas condições de saúde, como doenças cardíacas, diabetes e pressão alta.";
    } else if (imc >= 30 && imc <= 34.99) {
        classificacao = "Obesidade grau I";
        informacao = "Indica que a pessoa está significativamente acima do peso considerado saudável para sua altura. Isso aumenta significativamente o risco de desenvolver doenças crônicas, como diabetes tipo 2, doenças cardíacas e derrames.";
    } else if (imc >= 35 && imc <= 39.99) {
        classificacao = "Obesidade grau II";
        informacao = "Indica que a pessoa está muito acima do peso considerado saudável para sua altura. O risco de complicações de saúde é ainda maior nesta categoria.";
    } else {
        classificacao = "Obesidade grau III";
        informacao = "Também conhecida como obesidade mórbida, indica que a pessoa está extremamente acima do peso considerado saudável para sua altura. Isso representa um risco significativo para a saúde e pode reduzir a expectativa de vida.";
    }

    // Exibindo os resultados em um alerta
    alert("Resultado:\n" +
          "Nome: " + nome + "\n" +
          "IMC: " + imc.toFixed(2) + "\n" +
          "Classificação: " + classificacao + "\n" +
          "Peso normal: " + pesoNormal + "\n" +
          "Informação: " + informacao
    );
}
