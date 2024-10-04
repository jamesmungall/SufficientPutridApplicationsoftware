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

window.onload = function () {
  document
    .getElementById("run_plotly_button")
    .addEventListener("click", run_plotly);
}
