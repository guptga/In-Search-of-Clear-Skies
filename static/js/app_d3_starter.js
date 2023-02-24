// Southern Ontario Coordinates
coordinates = ['43.591706','-81.639478','45.747761','-76.306641'];
// North America Coordinates
// coordinates = ['28.491626','-126.741920','67.931333','-64.976622'];

const url_map = `https://api.waqi.info/map/bounds?token=${aqi_key}&latlng=${coordinates[0]},${coordinates[1]},${coordinates[2]},${coordinates[3]}`;

var gaugeContainer = document.getElementById("gauge-container");
var legendContainer = document.getElementById("legend");

function createGauge(airQualityIndex) {
    // Set the size and margins of the gauge
    const width = 200;
    const height = 200;
    const margin = 20;
  
    // Calculate the radius of the gauge
    const radius = Math.min(width, height) / 2 - margin;
  
    // Create the SVG element for the gauge
    const svg = d3.select("#gauge-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
  
    // Create a group for the gauge elements
    const gauge = svg.append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
  
    // Define the color scale for the gauge
    const colorScale = d3.scaleThreshold()
      .domain([50, 100, 150, 200, 300])
      .range(["#00e400", "#ffff00", "#ff7e00", "#ff0000", "#8f3f97", "#7e0023"]);
  
    // Add the background arc
    gauge.append("path")
      .datum({ endAngle: Math.PI })
      .style("fill", "#ddd")
      .attr("d", d3.arc()
        .innerRadius(radius * 0.8)
        .outerRadius(radius)
        .startAngle(0)
        .endAngle(Math.PI * 2)
      );
  
    // Add the foreground arc
    gauge.append("path")
      .datum({ endAngle: Math.PI })
      .style("fill", colorScale(airQualityIndex))
      .attr("d", d3.arc()
        .innerRadius(radius * 0.8)
        .outerRadius(radius)
        .startAngle(0)
      );
  
    // Add the label for the air quality index
    gauge.append("text")
      .attr("text-anchor", "middle")
      .attr("y", height / 2 - margin)
      .text(airQualityIndex);
}


// function to add heat to map
function heat(response) {
    heatArray = [];
    for (var i = 0; i < response.data.length; i++) {
        // var location = data[i].location;
       
        if (Number.isNaN(response.data[i].aqi)){
            console.log("Omission at " + response.data[i].lat + ", " + response.data[i].lon + " due to NaN");
        }
        else{
        
          heatArray.push([response.data[i].lat,response.data[i].lon,5000*response.data[i].aqi]); //5*Math.sqrt(response.data[i].aqi)]);  //,0.2*(response.data[i].aqi**2)]);

        }
        
      }
    // console.log(heatArray);

    // For leaftlet-heatmap.js
    var heat = new HeatmapOverlay({
        "radius": 0.5,
        "maxOpacity": .4,
        "scaleRadius": true,
        // "useLocalExtrema": true,
        latField: 'lat',
        lngField: 'lon',
        valueField: 'aqi'
    }).addTo(map);

    heat.setData(response);
    heatLayer = {"AQI Heatmap": heat};
    const airQualityIndex = response.data[0].aqi;
    createGauge(airQualityIndex);
 
    L.control.layers({},heatLayer).addTo(map);

    function markerColor(aqi) {
        switch(true) {
            case aqi > 300:
                return "#7e0023";
            case aqi > 200:
                return "#8f3f97";
            case aqi > 150:
                return "#ff0000";
            case aqi > 100:
                return "#ff7e00";
            case aqi > 50:
                return "#ffff00";
            default:
                return "#00e400";
        };
    }
    var legend = L.control({position: "bottomright"});
    
    legend.onAdd = function(map) {
        let div = L.DomUtil.create("div", "info legend");
        let limits = [0,50,100,150,200,300];
        div.innerHTML = "<h3 style = 'text-align: center'> Levels of Health Concern </h3>"
    
        for (let i = 0; i < limits.length; i++) {
            div.innerHTML += 
            '<i style ="background:' + markerColor(limits[i] + 1) + '"></i> ' +
            limits[i] + (limits[i + 1] ? '&ndash;' + limits[i + 1] + '<br>' : '+');
        }
        return div;
    };
    
    legend.addTo(map);
}

var map = L.map("map", {
    center: [43.6532,-79.3832],
    zoom: 7, // 5 previously
    // layers: [heat]
}); 

// Adding the tile layer
baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="htts://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 2,
    maxZoom: 12 // 8 for large map?
}).addTo(map);

function addMarkers(data){

    markerArray = [];

    for (var i = 0; i < data.data.length; i++) {
        var aqi_object = data.data[i].aqi;
        var latlng = [data.data[i].lat, data.data[i].lon];

        if (aqi_object) {
            var marked = L.marker(latlng, {

            })
            // .bindPopup("<h3>" + aqi_object + "</h3>")
            .bindTooltip(aqi_object,{
                // permanent: true,
                // sticky: true,
                opacity: 0.7,
                direction: 'top'
            })
            .addTo(map);
            markerArray.push(marked);
        }

    }
    
}

d3.json(url_map).then(function(data){
    setTimeout(function(){
    },1000);

    console.log(data);
    
    heat(data);
    addMarkers(data);
    
});

function init() {
    var dropdown = d3.select("#dropdown");
    var options = dropdown.selectAll("option")
        .data(cities) // cities is an array of city names
        .enter()
        .append("option")
        .text(function(d) { return d; });

    // When the dropdown selection changes, call the AQICN API to get the AQI data
    dropdown.on("change", function() {
        var city = this.value;
        d3.json(url_map).then(function(data) {
            var AQI = data.aqi;
            heat(AQI);
        });
    });

}

function optionChanged(newAQI) {
    heat(newAQI);
}

init();



// Rough notes, versioning, etc 

// Leaflet-heat version of heat map
        //   heatArray.push({"lat": response.data[i].lat, 
        //   "lon": response.data[i].lon, 
        //   "aqi": 80*Math.sqrt(response.data[i].aqi)});

   // var heat = L.heatLayer(heatArray, {
    //     'radius': 35,
    //     'blur': 40,
    //     'max': 100,
    //     gradient: {0.1: 'green',0.5: 'yellow', 1.0: 'red'}
    // }).addTo(map);

// function createMap(layer1, layer2){
    // map object


    // Add map layers to control
    // L.control.layers(heat,{collasped: false}).addTo(map);
    // L.control.layers({},layer1, layer2).addTo(map);

// }

// Option to center map
//.setView([44,-77],2);

// Leftover code to have layers of markers and heat?
    // inside markers function 
    // L.control.layers(L.layerGroup(markerArray)).addTo(map); 

// heatGroup = heat(data);
    
    // console.log(heatGroup);
    // heat_layer = L.layerGroup(heatGroup);
    // overlayHeat = {
    //     "AQI Gradient": heat_layer };

    // var layer1 = heat(data);
    // var layer2 = addMarkers(data);
    // createMap(layer1, layer2);
    
 // if (location) {
    // }