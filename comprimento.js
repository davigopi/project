function converter() {
    const distanceInMeters = parseFloat(document.getElementById('distance').value);
    const selectedUnit = document.getElementById('unit').value;
    let convertedDistance;
    let text = `${distanceInMeters} metro(s) é aproximadamente `;
    switch (selectedUnit) {
        case 'jardas':
            convertedDistance = distanceInMeters * 1.094;
            text += `${convertedDistance.toFixed(2)} jarda(s).`;
            break;
        case 'pes':
            convertedDistance = distanceInMeters * 3.281;
            text += `${convertedDistance.toFixed(2)} pé(s).`;
            break;
        case 'polegadas':
            convertedDistance = distanceInMeters * 39.37;
            text += `${convertedDistance.toFixed(2)} polegada(s).`;
            break;
        case 'milhas':
            convertedDistance = distanceInMeters * 0.000621;
            text += `${convertedDistance.toFixed(2)} milha(s).`;
            break;
        default:
            text = 'Selecione uma unidade de medida válida.';
            break;          
    }
    document.getElementById('result').textContent = text;
}
