// Place url in a constant variable
//const url1 = "Input.json"
//token = ""
//const url2 = "https://api.waqi.info/feed/geo:"
const url3 = "AQ Ontario Station Data.csv"
const urlweather = "https://api.openweathermap.org/data/2.5/forecast?lat="
const urlpollution = "http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=" 
//const weathertoken = ""



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

            var stationurl = urlpollution + lat + "&lon=" + long + "&units=imperial&appid=" + weathertoken
            console.log(stationurl)
            // AQI API Begins
            d3.json(stationurl).then((jsonOutput) => {
                //add logic for chart here
                //const obj = JSON.parse(jsonOutput)
                let fullData = jsonOutput.list
                //let dailyo3Forecast = fullData.forecast.daily.o3
                //let dailyPM10Forecast = fullData.forecast.daily.pm10
                //let dailyCOForecast = fullData.forecast.daily.CO

                //console.log(fullData)
                //console.log(dailyPM10Forecast)
                //console.log(dailyCOForecast)
                buildLineChart(fullData)

            });

            //Weather API Begins
            var weatherapi = urlweather + lat + "&lon=" + long + "&units=imperial&appid=" + weathertoken
            //console.log(weatherapi)
            d3.json(weatherapi).then((weatherOut) => {
              let weatherData = weatherOut.list
              //console.log(weatherData)
              buildWeatherChart(weatherData)
              

          });

          };
          
    	}    
      });

    
};

//function to populate weather chart
function buildWeatherChart(weatherData) {

     
  var data = [];
  var dataSerieso3 = { type: "area",   
                        fillOpacity: .3,
                        lineThickness: 4,
                        showInLegend: true,
                        legendText: "Temperature" };
/*   var dataSeriespm10 = { type: "spline", 
                        lineThickness: 4,
                        showInLegend: true,
                        legendText: "PM10" };
  var dataSeriespm25 = { type: "line", 
                        lineThickness: 2,
                        showInLegend: true,
                        legendText: "PM25" }; */

  var dataPointso3 = [];
  /* var dataPointspm10 = [];
  var dataPointspm25 = []; */
  for (var i = 0; i < weatherData.length; i++) {
    
    dataPointso3.push({
      x: new Date(weatherData[i].dt * 1000),
      y: weatherData[i].main.temp
    });
  }
  /* for (var i = 0; i < pm10.length; i++) {
    
    dataPointspm10.push({
      x: new Date(pm10[i].day),
      y: pm10[i].avg
    });
  }
  for (var i = 0; i < pm25.length; i++) {
    
    dataPointspm25.push({
      x: new Date(pm25[i].day),
      y: pm25[i].avg
    });
  } */
  dataSerieso3.dataPoints = dataPointso3;
 /*  dataSeriespm10.dataPoints = dataPointspm10;
  dataSeriespm25.dataPoints = dataPointspm25; */
  data.push(dataSerieso3);
  /* data.push(dataSeriespm10);
  data.push(dataSeriespm25); */
  
  //Better to construct options first and then pass it as a parameter
  var options = {
    zoomEnabled: true,
    animationEnabled: true,
    title: {
      text: "Weather Forecast"
    },
    axisY: {
      title: "Temperature"
    },
    axisX: {
      title: "Date"
    },
    data: data  
  };
  
  var chart = new CanvasJS.Chart("chartWeatherContainer", options);
  var startTime = new Date();
  chart.render();
  var endTime = new Date();
  document.getElementById("timeWeatherToRender").innerHTML = "Time to Render Weather: " + (endTime - startTime) + "ms";
  
  }

//function to populate chart
function buildLineChart(fullData) {

  //var limit = 5000;
  //var y = 100;    
  var data = [];
  var dataSerieso3 = { type: "area",   
                        fillOpacity: .3,
                        lineThickness: 4,
                        showInLegend: true,
                        legendText: "O3" };
  var dataSeriespm10 = { type: "spline", 
                        lineThickness: 4,
                        showInLegend: true,
                        legendText: "PM10" };
  var dataSeriespm25 = { type: "line", 
                        lineThickness: 2,
                        showInLegend: true,
                        legendText: "PM25" };

  var dataPointso3 = [];
  var dataPointspm10 = [];
  var dataPointspm25 = [];
  for (var i = 0; i < fullData.length; i++) {
    //var readingdate = new Date(fullData[i].dt)
    //console.log("date is" + readingdate.toDateString())
    //console.log("original is" + Date(fullData[i].dt))
    dataPointso3.push({
      x: new Date(fullData[i].dt * 1000),
      y: fullData[i].components.o3
    });
  }
  for (var i = 0; i < fullData.length; i++) {
    
    dataPointspm10.push({
      x: new Date(fullData[i].dt * 1000),
      y: fullData[i].components.pm10
    });
  }
  for (var i = 0; i < fullData.length; i++) {
    
    dataPointspm25.push({
      x: new Date(fullData[i].dt *1000),
      y: fullData[i].components.pm2_5
    });
  }
  dataSerieso3.dataPoints = dataPointso3;
  dataSeriespm10.dataPoints = dataPointspm10;
  dataSeriespm25.dataPoints = dataPointspm25;
  data.push(dataSerieso3);
  data.push(dataSeriespm10);
  data.push(dataSeriespm25);
  
  //Better to construct options first and then pass it as a parameter
  var options = {
    zoomEnabled: true,
    animationEnabled: true,
    title: {
      text: "Weekly Particle Forecast"
    },
    axisY: {
      title: "Pollutant Level"
    },
    axisX: {
      title: "Date"
    },
    data: data  
  };
  
  var chart = new CanvasJS.Chart("chartContainer", options);
  var startTime = new Date();
  chart.render();
  var endTime = new Date();
  document.getElementById("timeToRender").innerHTML = "Time to Render: " + (endTime - startTime) + "ms";
  
  }

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