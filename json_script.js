async function fetchJsonData() {
    try {
        const response = await fetch('https://jamesmungall.github.io/SufficientPutridApplicationsoftware/data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        document.getElementById('jsonData').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

fetchJsonData();
