 /*async function populate() {
    // URL
    const url = "https://github.com/guptga/Project-3-In-Search-of-Clear-Skies/blob/main/sample_AQI_call.json";
    const request = new Request(url);
    const response = await fetch(request);
    const aqi = await response.json();
}*/

function getData(latitude, longitude) {
    let url = "https://github.com/guptga/Project-3-In-Search-of-Clear-Skies/blob/main/sample_AQI_call.json";
    fetch(url)
    .then(function(response) {
        let data = response.json();
        return data;
    })
    .then(function(data) {
        air.index = data.data.aqi;
        air.city = data.data.city.name;
    })
    .then(function(){
        showData();
    })
}


/*

const url = "https://github.com/guptga/Project-3-In-Search-of-Clear-Skies/blob/main/sample_AQI_call.json";
function plot(id) {
    d3.json(url).then(function(data)) {
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == id);
        var result = resultArray[0];
        var aqi = result.aqi;
        var attributions = 
        var 
        console.log(aqi, city, idx)
    
}
// Chart Function
function plot(){

    var trace1 = {
        x: ,
        y: ,
        text: ,
        type: 
    };

    var data = [trace1];

    var layout = {
        title: ,
        xaxis: ,
        yaxis:
    };

    Plotly.newPlot('', trace1, layout);
}

// Gauge Function

// Heatmap

// Drop down menu
function init() {
    
}

function option_change(newSample) {
    plot(newSample);

}

init();
*/

