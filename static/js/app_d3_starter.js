// Southern Ontario Coordinates
// coordinates = ['43.591706','-81.639478','45.747761','-76.306641'];
// North America Coordinates
// coordinates = ['28.491626','-126.741920','67.931333','-64.976622'];
// Updated Southern Ontario Coordinates 
// coordinates = ['43.000002', '-80.939047','46.930924','-76.277734'];
// Another attempt 
coordinates = ['42.895460','-82.513621','46.595439','-76.031763'];

const url_map = `https://api.waqi.info/map/bounds?token=${aqi_key}&latlng=${coordinates[0]},${coordinates[1]},${coordinates[2]},${coordinates[3]}`;

// This section will define color coded leaflet icon markers 
var aqiIcon = L.Icon.extend({
    options: {
        iconSize: [30,30],
        // iconAnchor:[0,10],
        // popupAnchor:[0,0]
    }
});

var greenIcon = new aqiIcon({iconUrl: 'static/icons/pin-5-48-green.png'}),
maroonIcon = new aqiIcon({iconUrl: 'static/icons/pin-5-48-maroon.png'}),
orangeIcon = new aqiIcon({iconUrl: 'static/icons/pin-5-48-orange.png'}),
purpleIcon = new aqiIcon({iconUrl: 'static/icons/pin-5-48-purple.png'}),
redIcon = new aqiIcon({iconUrl: 'static/icons/pin-5-48-red.png'}),
yellowIcon = new aqiIcon({iconUrl: 'static/icons/pin-5-48-yellow.png'});

function markerColor(a){
    return a > 301 ? maroonIcon: //#660066':
      a > 201? purpleIcon :
      a > 151? redIcon :
      a > 101? orangeIcon :
      a > 51 ? yellowIcon:
      a > 0 ? greenIcon :
      '*';
}

// Used to decide color of circle markers 
function aqiGradient(a){
    return a > 301 ? 'maroon': //#660066':
      a > 201? 'purple' :
      a > 151? 'red' :
      a > 101? 'orange' :
      a > 51 ? 'yellow':
      a > 0 ? 'green' :
      'black';
}

// function to add heat to map
function heat(response){
    heatArray = [];
    for (var i = 0; i < response.data.length; i++) {
        // var location = data[i].location;
       
        if (Number.isNaN(response.data[i].aqi)){
            console.log("Omission at " + response.data[i].lat + ", " + response.data[i].lon + " due to NaN");
        }
        else{
        
          heatArray.push([response.data[i].lat,response.data[i].lon,5000*response.data[i].aqi]); //5*Math.sqrt(response.data[i].aqi)]);  //,0.2*(response.data[i].aqi**2)]);

        // response.data[i].aqi = 500*(response.data[i].aqi)**(-2);
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
    // heatLayer = {"AQI Heatmap": heat};
 
    // L.control.layers({},heatLayer).addTo(map);
    var overlayMaps = {
        Parks: markerClusters,
        Power_Plants: powerMarker,
        AQI_Heatmap: heat
      };
      
      // Toggle control for parks and powerstations
      L.control.layers(null, overlayMaps, {collapsed: false}).addTo(map);
}

// // Commenting out this section, already initalized in Michelle's
// var map = L.map("map", {
//     center: [43.6532,-79.3832],
//     zoom: 7, // 5 previously
//     // layers: [heat]
// }); 

// // Adding the tile layer
// baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="htts://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     minZoom: 2,
//     maxZoom: 12 // 8 for large map?
// }).addTo(map);



// // Stack overflow version with palettes.js?
//Get an array of unique categories
//Reference: [1]
// var uniqueCategories = [...new Set(points.map(function(point) {
//     return point.category
// }))]

//Create palette ('mpn65' has up to 65 different colours)
// var palette = palette('mpn65',uniqueCategories.length);
// var palette = palette('mpn65',4);

//Construct empty JavaScript Map (keys mapped to values)
//Reference: [2]
// var paletteMap = new Map()

//Map all categories to a RGB colour string
// for(let i = 0; i < palette.length; i++) {
//     paletteMap.set(a[i],palette[i])
// }

//Add circleMarkers to Leaflet map
// for (let point of points) {
//   L.circleMarker(point.coordinates,
//                  {color: '#' + paletteMap.get(point.category)} //retrieve mapped colour
//                 ).addTo(map)
// }


function addMarkers(data){

    markerArray = [];

    for (var i = 0; i < data.data.length; i++) {
        var aqi_object = data.data[i].aqi;
        var latlng = [data.data[i].lat, data.data[i].lon];

        if (aqi_object) {
            var marked = L.marker(latlng, {
                icon: markerColor(aqi_object)
            })
            // // .bindPopup("<h3>" + aqi_object + "</h3>")
            // .bindTooltip(aqi_object,{
            //     // permanent: true,
            //     // sticky: true,
            //     opacity: 0.7,
            //     direction: 'top'
            // })
            // .addTo(map);
            // var marked = L.circle(latlng, {
            //     // color:'red',
            //     stroke: false,
            //     fillColor: aqiGradient(aqi_object),
            //     fillOpacity: 0.4,
            //     radius: 8000
            // })
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
    data.data = data.data.filter(item => !item.station.name.includes('USA'));
    console.log(data);

    heat(data);
    addMarkers(data);
    
    // try to filter and gather all the station IDs or names 
    // data.filter(x)
    // function stationName(data){
    //     return data.station.name;
    // }
    // let stationNames = data.filter(stationName);
});



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