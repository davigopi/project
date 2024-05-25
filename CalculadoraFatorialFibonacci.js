// Função para calcular o fatorial de um número
function calcularFatorial(numero) {
    if (numero === 0 || numero === 1) {
        return 1;
    } else {
        return numero * calcularFatorial(numero - 1);
    }
}

// A função calcularFibonacci(numero) calcula a sequência de Fibonacci até um 
// número específico. A sequência de Fibonacci é uma série de números em que 
// cada número subsequente é a soma dos dois números anteriores.Por exemplo, 
// a sequência começa com 0 e 1, e os números seguintes são 1, 2, 3, 5, 8, 13 
// e assim por diante
function calcularFibonacci(numero) {
    let fibonacci = [0, 1];
    for (let i = 2; i <= numero; i++) {
        fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
    }
    return fibonacci.slice(0, numero + 1);
}

