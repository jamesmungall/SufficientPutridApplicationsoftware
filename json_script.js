async function get_json() {
  try {
    const response = await fetch(
      "https://jamesmungall.github.io/SufficientPutridApplicationsoftware/stars_0_23pc.json"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    make_json_data_var(data);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function make_json_data_var(data) {
  source_id_array = Object.values(data.SOURCE_ID);
  document.getElementById("source_id").textContent = source_id_array;

  ra_array = Object.values(data.ra);
  document.getElementById("ra").textContent = ra_array;

  dec_array = Object.values(data.dec);
  document.getElementById("dec").textContent = dec_array;

  distance_array = Object.values(data.distance_gspphot);
  document.getElementById("distance").textContent = distance_array;

  magnitude_array = Object.values(data.phot_g_mean_mag);
  document.getElementById("magnitude").textContent = magnitude_array;

  temperature_array = Object.values(data.teff_gspphot);
  document.getElementById("temperature").textContent = temperature_array;

  json_data_var = {
    source_id: source_id_array,
    ra: ra_array,
    dec: dec_array,
    distance: distance_array,
    magnitude: magnitude_array,
    temperature: temperature_array
  };
}

function run_plotly() {
  var trace1 = {
    x: json_data_var.x,
    y: json_data_var.y,
    z: json_data_var.z,
    mode: "markers",
    marker: {
      size: json_data_var.brightness,
      color: json_data_var.temperature
    },
    type: "scatter3d"
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

function add_xyz() {
  x_array = [];
  y_array = [];
  z_array = [];
  ra = json_data_var.ra;
  dec = json_data_var.dec;
  distance = json_data_var.distance;

  for (let i = 0; i < distance.length; i++) {
    x_array[i] = distance[i] * Math.cos(dec[i]) * Math.sin(ra[i]);
    y_array[i] = distance[i] * Math.cos(dec[i]) * Math.cos(ra[i]);
    z_array[i] = distance[i] * Math.sin(dec[i]);
  }
  json_data_var["x"] = x_array;
  json_data_var["y"] = y_array;
  json_data_var["z"] = z_array;

  if (json_data_var) {
    output = "output is ";
  } else {
    output = "empty output";
  }
  document.getElementById("output").textContent = output;
}

function add_brightness() {
  magnitude = json_data_var.magnitude;
  brightness = [];
  for (let i = 0; i < magnitude.length; i++) {
    brightness[i] = 2.5 ^ (8 - magnitude[i]);
  }
  json_data_var["brightness"] = brightness;
  document.getElementById("output").textContent = output;
}

var json_data_var;

window.onload = function () {
  document
    .getElementById("get_json_button")
    .addEventListener("click", get_json);
  document.getElementById("add_xyz_button").addEventListener("click", add_xyz);
  document
    .getElementById("run_plotly_button")
    .addEventListener("click", run_plotly);
  document
    .getElementById("add_brightness_button")
    .addEventListener("click", add_brightness);
};
