async function get_json() {
  try {
    const response = await fetch(
      "https://jamesmungall.github.io/SufficientPutridApplicationsoftware/stars_0_23pc.json"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    use_json(data);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function use_json(data) {
  ra_array = Object.values(data.ra);
  document.getElementById("ra").textContent = ra_array;

  dec_array = Object.values(data.dec);
  document.getElementById("dec").textContent = dec_array;
  
  temp_array = Object.values(data.teff_gspphot);

  run_plotly(ra_array, dec_array, temp_array);
}
function run_plotly(ra_array, dec_array, temp_array) {
  var trace1 = {
    x: ra_array,
    y: dec_array,
    mode: "markers",
    marker: {
      size: 5,

      color: temp_array
    },
    type: "scatter"
  };

  var data = [trace1];
  var layout = {
    title: "Scroll and Zoom",
    showlegend: false,
    margin: { t: 0 },
    title: "Chart Title"
  };
  var params = {
    editable: true,
    scrollZoom: true
  };

  Plotly.newPlot("plotly_div", data, layout, params);
}
window.onload = function () {
  document.getElementById('myButton').addEventListener('click', get_json);
}
