// Place url in a constant variable
//const url1 = "Input.json"
token = "7d4b07b555e7bb7b62be7b734a673dd4c7d257d8"
const url2 = "https://api.waqi.info/feed/geo:"
const url3 = "AQ Ontario Station Data.csv"


// Fetch the JSON data and console log it
d3.csv(url3).then(function(data) {
  console.log(data);
});

// Initialize the dashboard at start up 
function init() {

    // Use D3 to select the dropdown menu
    let dropdown = d3.select("#locality-dropdown");
    dropdown.length = 0;

    //let defaultOption = document.createElement('option');
    //defaultOption.text = 'Choose State/Province';

    dropdown.append("option")
    .text("Choose Station")
    .property("value","Choose Station");
    //dropdown.selectedIndex = 0;

    // Use D3 to get sample names and populate the drop-down selector
    d3.csv(url3).then(function(data) {  
        let option;
    
    	for (let i = 0; i < data.length; i++) {
          //option = document.createElement('option');
      	  //option.text = data[i].name;
      	  //option.value = data[i].name;
      	  dropdown.append("option")
          .text(data[i].Station)
          .property("value",data[i]['Station ID']);
    	}    
      });
};

function readData(StationID) {
    var lat = ""
    var long = ""

    d3.csv(url3).then(function(data) {         
    
    	for (let i = 0; i < data.length; i++) {
          //option = document.createElement('option');
      	  //option.text = data[i].name;
      	  //option.value = data[i].name;

      	  if (data[i]['Station ID'] == StationID) {
            console.log(data[i].Latitude)
            console.log(data[i].Longitude)
            lat = data[i].Latitude;
            long = data[i].Longitude;

            var stationurl = url2 + lat + ";" + long + '/?token=' + token
            console.log(stationurl)
            // Use D3 to retrieve all of the data
            d3.json(stationurl).then((data) => {
                //add logic for chart here

                console.log(data)


            });

          };
          
    	}    
      });

    
};


// Function that updates dashboard when sample is changed
function optionChanged(value) { 

    // Log the new value
    console.log(value); 

    // Call all functions 
    readData(value);
  
};

/*
// Set up D3 margin and dimensions for chart
const margin = { top: 20, right: 20, bottom: 50, left: 70 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// Create SVG element
const svg = d3.select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Make API request to fetch data
fetch("https://api.waqi.info/feed/")
  .then(response => response.json()) // Parse response as JSON
  .then(data => {
    const pollutantValues = Object.entries(data.data.iaqi).map(([key, value]) => {
      if (key !== "p") { // Exclude PM2.5 pollutant
        return {
          label: key.toUpperCase(),
          value: value.v
        }
      }
    }).filter(Boolean); // Filter out undefined values

    // Set up D3 scales and axis
    const xScale = d3.scaleBand()
      .domain(pollutantValues.map(({label}) => label))
      .range([0, width])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(pollutantValues, ({value}) => value)])
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale);

    const yAxis = d3.axisLeft(yScale);

    // Add x-axis and y-axis to chart
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    svg.append("g")
      .call(yAxis);

    // Add bars to chart
    svg.selectAll("rect")
      .data(pollutantValues)
      .enter()
      .append("rect")
      .attr("x", ({label}) => xScale(label))
      .attr("y", ({value}) => yScale(value))
      .attr("width", xScale.bandwidth())
      .attr("height", ({value}) => height - yScale(value))
      .attr("fill", "steelblue");

    // Add chart title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Pollutant levels in Mississauga");
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });

  */
// Call the initialize function
init();