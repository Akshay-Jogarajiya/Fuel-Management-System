
const fuelForm = document.getElementById('fuelForm');

fuelForm.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const date = document.getElementById('date').value;
    const fuelQuantity = parseFloat(document.getElementById('fuel-quantity').value);
    const fuelPrice = parseFloat(document.getElementById('fuel-price').value);
    const odometer = parseFloat(document.getElementById('odometer').value);
    const location = document.getElementById('location').value || 'N/A';

    const fuelData = {
        date: date,
        fuelQuantity: fuelQuantity,
        fuelPrice: fuelPrice,
        odometer: odometer,
        location: location
    };

    let fuelLogs = JSON.parse(localStorage.getItem('fuelLogs')) || [];

    fuelLogs.push(fuelData);

    localStorage.setItem('fuelLogs', JSON.stringify(fuelLogs));

    fuelForm.reset();

    alert('Fuel data added successfully!');
});
