var map = L.map( 'map', {
  center: [44.0, -79.0],
  minZoom: 2,
  zoom: 7
});
 
L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
 subdomains: ['a','b','c']
}).addTo( map );
 
var myURL = jQuery('script[src$="logic.js"]').attr( 'src' ).replace( 'logic.js', '' );
 
var myIcon = L.icon({
  iconUrl: myURL + 'images/pin24.png',
  iconRetinaUrl: myURL + 'images/pin48.png',
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
 
map.addLayer( markerClusters );