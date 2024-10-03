async function fetchCsvData() {
    try {
        const response = await fetch('data.csv');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const csvText = await response.text();
        const data = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true
        });

        const csvArray = data.data; // This will be an array of objects
        document.getElementById('csvData').textContent = JSON.stringify(csvArray, null, 2);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

fetchCsvData();
