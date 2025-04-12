
const fuelLogs = JSON.parse(localStorage.getItem('fuelLogs')) || [];

let totalDistance = 0;
let totalFuel = 0;
let totalCost = 0;

let monthlyData = {};

// Calculate total distance, fuel, and cost, and organize data by month
fuelLogs.forEach( (log) => {

    totalDistance += log.odometer;
    totalFuel += log.fuelQuantity;
    totalCost += log.fuelQuantity * log.fuelPrice;

    const date = new Date(log.date);
    const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;

    // Initialize monthly data if not present
    if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = {
            totalDistance: 0,
            totalFuel: 0,
            totalCost: 0
        };
    }

    // Accumulate monthly data
    monthlyData[monthYear].totalDistance += log.odometer;
    monthlyData[monthYear].totalFuel += log.fuelQuantity;
    monthlyData[monthYear].totalCost += log.fuelQuantity * log.fuelPrice;
});

// Calculate fuel efficiency (distance per liter) and average fuel price
const fuelEfficiency = totalDistance / totalFuel;
const avgFuelPrice = totalCost / totalFuel;

// Update statistics in the HTML
document.getElementById('totalDistance').textContent = totalDistance.toFixed(2);
document.getElementById('totalFuel').textContent = totalFuel.toFixed(2);
document.getElementById('fuelEfficiency').textContent = fuelEfficiency.toFixed(2);
document.getElementById('avgFuelPrice').textContent = avgFuelPrice.toFixed(2);

// Display monthly breakdown in the table
const monthlyDataBody = document.getElementById('monthlyData');

for (const [month, data] of Object.entries(monthlyData)) {
    
    const efficiency = data.totalDistance / data.totalFuel;
    const row = `
        <tr>
            <td>${month}</td>
            <td>${data.totalDistance.toFixed(2)} km</td>
            <td>${data.totalFuel.toFixed(2)} liters</td>
            <td>${efficiency.toFixed(2)} km/l</td>
            <td>$${data.totalCost.toFixed(2)}</td>
        </tr>
    `;
    monthlyDataBody.innerHTML += row;
}



// Data for the efficiency chart (dates and fuel efficiency)
const labels = fuelLogs.map(log => log.date); // Extracting dates
const efficiencyData = fuelLogs.map(log => log.odometer / log.fuelQuantity); // Efficiency for each entry

// Line Chart for Fuel Efficiency Over Time
const ctxEfficiency = document.getElementById('efficiencyChart').getContext('2d');
const efficiencyChart = new Chart(ctxEfficiency, {

    type: 'line',

    data: {

        labels: labels,

        datasets: [{

            label: 'Fuel Efficiency (km/l)',
            data: efficiencyData,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: true
        }]
    },
    options: {
        scales: {
            x: { title: { display: true, text: 'Date' }},
            y: { title: { display: true, text: 'Efficiency (km/l)' }}
        }
    }
});




// Data for the monthly consumption chart
const months = Object.keys(monthlyData);
const monthlyFuel = months.map(month => monthlyData[month].totalFuel);

// Bar Chart for Monthly Fuel Consumption
const ctxConsumption = document.getElementById('consumptionChart').getContext('2d');
const consumptionChart = new Chart(ctxConsumption, {

    type: 'bar',

    data: {

        labels: months,

        datasets: [{

            label: 'Fuel Consumed (liters)',
            data: monthlyFuel,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            x: { title: { display: true, text: 'Month' }},
            y: { title: { display: true, text: 'Fuel (liters)' }}
        }
    }
});



// Data for the cost chart
const totalCostPerMonth = months.map(month => monthlyData[month].totalCost);

// Pie Chart for Fuel Cost Distribution
const ctxCost = document.getElementById('costChart').getContext('2d');
const costChart = new Chart(ctxCost, {

    type: 'pie',

    data: {

        labels: months,

        datasets: [{

            label: 'Cost per Month',
            data: totalCostPerMonth,
            
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
});
