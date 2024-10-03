async function fetchJsonData(filename) {
    try {
        const response = await fetch(filename);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
    return JSON.parse(data)
}

json_obj = fetchJsonData('stars_0_23pc.json');

document.getElementById('jsonData').textContent = json_obj.source_id;
document.getElementById('ra').textContent = json_obj.ra;
document.getElementById('dec').textContent = json_obj.dec;
