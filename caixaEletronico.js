let saldo = 1000;

document.getElementById('realizar').addEventListener('click', function() {
    const operacao = document.getElementById('operacao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const monitor = document.getElementById('monitor');

    if (isNaN(valor) || valor < 0) {
        monitor.value = '\n Valor inválido';
        return;
    }

    let text = '';

    switch (operacao) {
        case 'saldo':
            text = `\n Saldo: R$ ${saldo.toFixed(2)}`;
            monitor.value = text;
            break;
        case 'sacar':
            if (valor > saldo) {
                text = `\n Saldo: R$ ${saldo.toFixed(2)} \n insuficiente`;
                monitor.value = text;
            } else {
                saldo -= valor;
                text = `\n Sacou: R$ ${valor.toFixed(2)} \n \n Saldo: R$ ${saldo.toFixed(2)}`;
                monitor.value = text;
            }
            break;
        case 'depositar':
            saldo += valor;
            text = `\n Depositou: R$ ${valor.toFixed(2)} \n \n Saldo: R$ ${saldo.toFixed(2)}`;
            monitor.value = text;
            break;
        default:
            monitor.value = '\n Operação inválida.';
    }
});
