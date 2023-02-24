var map = L.map( 'map', {
  center: [44.0, -79.0],
  minZoom: 2,
  zoom: 7,
});
 
L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
 subdomains: ['a','b','c']
}).addTo( map );

var myURL = jQuery('script[src$="logic.js"]').attr( 'src' ).replace( 'logic.js', '' );

// power plants
var myIcon2 = L.icon({
  iconUrl: myURL + 'images/powerplant.png',
  iconRetinaUrl: myURL + 'images/powerplant.png',
  iconSize: [25, 20],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});

var powerMarker = L.layerGroup();
 
for ( var i = 0; i < power.length; ++i )
{
  var popup = 
      '<br/><b>Name:</b> ' + power[i].name +
      '<br/><b>Power Source:</b> ' + power[i].primary_fuel;
  var p = L.marker( [power[i].latitude, power[i].longitude], {icon: myIcon2} )
                  .bindPopup( popup );
 
  powerMarker.addLayer( p );
}
 
map.addLayer( powerMarker);

// Parks
var myIcon = L.icon({
  iconUrl: myURL + 'images/bench.png',
  iconRetinaUrl: myURL + 'images/bench.png',
  iconSize: [29, 24],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});

var markerClusters = L.markerClusterGroup();
 
for ( var i = 0; i < markers.length; ++i )
{
  var popup = markers[i].name +
      '<br/>' + markers[i].city +
      '<br/><b>Address:</b> ' + markers[i].formatted +
      '<br/><b>District:</b> ' + markers[i].state_district +
      '<br/><b>Longitude:</b> ' + markers[i].lon +
      '<br/><b>Latitude:</b> ' + markers[i].lat;
  var m = L.marker( [markers[i].lat, markers[i].lon], {icon: myIcon} )
                  .bindPopup( popup );
 
  markerClusters.addLayer( m );
}
 
map.addLayer( markerClusters);

var overlayMaps = {
  Parks: markerClusters,
  Power_Plants: powerMarker
};

// Toggle control for parks and powerstations
L.control.layers(null, overlayMaps, {collapsed: false}).addTo(map);