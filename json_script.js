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

  run_plotly(ra_array, dec_array);
}

function run_plotly(ra_array, dec_array) {
  TESTER = document.getElementById("plotly_div");

  Plotly.newPlot(
    TESTER,
    [
      {
        x: ra_array,

        y: dec_array
      }
    ],
    {
      margin: { t: 0 }
    }
  );
}
window.onload = function () {
  document.getElementById('myButton').addEventListener('click', get_json);
}
