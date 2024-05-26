document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();

    const amount = parseFloat(document.getElementById('total').value);
    const service = parseFloat(document.getElementById('service').value);

    calculateTip(amount, service, (tip, total) => {
        tip = tip.toFixed(2)
        total = total.toFixed(2)
        document.getElementById('tip-value').textContent = tip;
        document.getElementById('total-more-tip').textContent = total;
    });
});

const calculateTip = (bill, quality, callback) => {
    const tip = bill * quality;
    const total = bill + tip;
    callback(tip, total);
};
