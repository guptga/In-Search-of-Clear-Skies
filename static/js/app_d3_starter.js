coordinates = ['43.591706','-81.639478','45.747761','-76.306641'];
// const url_map = `https://api.waqi.info/map/bounds?token=${aqi_key}&latlng=43.591706,-81.639478,45.747761,-76.306641`;
const url_map = `https://api.waqi.info/map/bounds?token=${aqi_key}&latlng=${coordinates[0]},${coordinates[1]},${coordinates[2]},${coordinates[3]}`;

// map object
var map = L.map("map", {
    center: [43.6532,-79.3832],
    zoom: 12
}); //.setView([44,-77],2);

// Adding the tile layer
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);
// var basicBackground = L.tileLayer(
//     'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
//     maxZoom: 6
// }).addTo(map);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// function to add heat to map
function heat(response){
    heatArray = [];
    for (var i = 0; i < response.data.length; i++) {
        // var location = data[i].location;
        // if (location) {
          heatArray.push([response.data[i].lat, response.data[i].lon, response.data[i].aqi]);
        // }
      }
    // console.log(heatArray);

    var heat = L.heatLayer(heatArray, {radius: 100, blur:35}).addTo(map);
}

d3.json(url_map).then(function(data){
    console.log(data);
    heat(data);
});