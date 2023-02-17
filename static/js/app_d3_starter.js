const url_map = `https://api.waqi.info/map/bounds?token=${aqi_key}&latlng=43.591706,-81.639478,45.747761,-76.306641`;

// map object
var map = L.map("map",{
    center: [44,-77],
    zoom: 12
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// function to add heat to map
function heat(data){
    for (var i = 0; i < data.length; i++) {
        var location = response[i].location;
    
        if (location) {
          heatArray.push([location.coordinates[1], location.coordinates[0]]);
        }
      }
}

d3.json(url_map).then(function(data){
    console.log(data);
})