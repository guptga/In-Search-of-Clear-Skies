// Demographic Info
/*
function demographic(id) {
    d3.json(url).then(function(data) {
        var MetaData = data.metadata;
        var microbe = MetaData.filter(sampleObj => sampleObj.id == id);
        var result = microbe[0];
        var infobox = d3.select("#sample-metadata");
        infobox.html("");
        Object.entries(result).forEach(([key, value]) => {
            infobox.append("h5").text(`${key}: ${value}`);
        });

        var gauge = [
            {
                domain: {x: [0, 5], y: [0, 1]},
                value: result.wfreq,
                text: result.wfreq,
                type: "indicator",
                mode: "gauge+number",
                delta: { reference: 10},
                gauge: {
                    axis: { range: [null, 9] },
                    steps: [
                        { range: [0, 1], color: "rgb(249, 243, 236)" },
                        { range: [1, 2], color: "rgb(240, 234, 220)" },
                        { range: [2, 3], color: "rgb(231, 225, 205)" },
                        { range: [3, 4], color: "rgb(219, 217, 190)" },
                        { range: [4, 5], color: "rgb(205, 209, 176)" },
                        { range: [5, 6], color: "rgb(190, 202, 164)" },
                        { range: [6, 7], color: "rgb(173, 195, 153)" },
                        { range: [7, 8], color: "rgb(154, 188, 144)" },
                        { range: [8, 9], color: "rgb(133, 181, 137)" },
                    ],
                },
            },
        ];

        var layout = {
            title: "<b> Air Quality </b> <br> Index </br>",
            width: 500,
            height: 500,
            margin: { t: 50, r: 25, l: 25, b: 25},
        };
        Plotly.newPlot('gauge', gauge, layout);
    });
}
*/
// Load the GaugeJS library
var Gauge = require('gaugeJS');

// Get the container element
var container = document.getElementById("gauge-container");

// Set the gauge options
var options = {
  angle: 0,
  lineWidth: 0.2,
  radiusScale: 1,
  pointer: {
    length: 0.5,
    strokeWidth: 0.035,
    color: '#000000'
  },
  limitMax: true,
  limitMin: true,
  strokeColor: '#E0E0E0',
  generateGradient: true,
  highDpiSupport: true
};

// Initialize the gauge
var gauge = new Gauge(container).setOptions(options);

// Set the gauge value based on the AQI
gauge.maxValue = 500; // Maximum AQI value
gauge.setMinValue(0); // Minimum AQI value
gauge.set(100); // Set the current AQI value

// Set the gauge colors based on the AQI level
gauge.colorize = function(value) {
  if (value <= 50) {
    return '#00E400'; // Good AQI level
  } else if (value <= 100) {
    return '#FFFF00'; // Moderate AQI level
  } else if (value <= 150) {
    return '#FF7E00'; // Unhealthy for Sensitive Groups AQI level
  } else if (value <= 200) {
    return '#FF0000'; // Unhealthy AQI level
  } else if (value <= 300) {
    return '#8F3F97'; // Very Unhealthy AQI level
  } else {
    return '#7E0023'; // Hazardous AQI level
  }
};
