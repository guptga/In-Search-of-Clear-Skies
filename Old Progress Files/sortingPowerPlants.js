// // This runs into CORS issue, rather just save it as a js file 
// d3.json('sample_power_plant.json').then(function(data){
//     console.log(data);
// });

// do it with function?
// function selectFuel(power_plant){
//     return data.primary_fuel
// }

// This puls based on primary_fuel type 
var fuel = power_plant.filter(x => x.primary_fuel === 'Nuclear');
console.log(fuel);

// // This finds all the unique primary_fuel
// // https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript 
// var fuel2 = power_plant.map(item => item.primary_fuel).filter((value, index, self) => self.indexOf(value) === index);
// console.log(fuel2);
// // returns Solar, Hybrid, Wind, Biomass, Gas, Wave and Tidal, Coal, Nuclear, Oil, Other 


// Add some markers to see where the plants are 
for (var i = 0; i < fuel.length; i++) {
    
     
    var marked = L.marker([fuel[i].latitude,fuel[i].longitude], {
            title: fuel[i].primary_fuel,
            // clickable: true,
            // draggable: true,
            // icon: customIcon
    }).addTo(map);
    // marker._icon.classList.add("huechange");
}

uid = [0,33,18,35,24,21,37,2,36,1,26,7,13,34];
// var url_station = `https://api.waqi.info/feed/${uid[0]}/?token=${aqi_key}`;
var url_station = `https://api.waqi.info/feed/geo:43.945944;-78.894917/?token=${aqi_key}`;
// var url_station = `https://api.waqi.info/feed/geo:${lat};${lng}/?token=${aqi_key}`;
d3.json(url_station).then(function(data){
    console.log(data);
});