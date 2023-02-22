const url_map = `https://api.waqi.info/map/bounds?token=${aqi_key}&latlng=${coordinates[0]},${coordinates[1]},${coordinates[2]},${coordinates[3]}`;

// Demographic Info
function demographic(id) {
    d3.json(url).then(function(data) {
        var MetaData = data.metadata;
        var microbe = MetaData.filter(sampleObj => sampleObj.id == id);
        var result = microbe[0];
        var infobox = d3.select("#sample-metadata");
        infobox.html("");
        Object.entries(result).forEach(([key, value]) => {
            infobox.append("h5").text(`${key}: ${value}`);
        });

        var gauge = [
            {
                domain: {x: [0, 5], y: [0, 1]},
                value: result.wfreq,
                text: result.wfreq,
                type: "indicator",
                mode: "gauge+number",
                delta: { reference: 10},
                gauge: {
                    axis: { range: [null, 9] },
                    steps: [
                        { range: [0, 1], color: "rgb(249, 243, 236)" },
                        { range: [1, 2], color: "rgb(240, 234, 220)" },
                        { range: [2, 3], color: "rgb(231, 225, 205)" },
                        { range: [3, 4], color: "rgb(219, 217, 190)" },
                        { range: [4, 5], color: "rgb(205, 209, 176)" },
                        { range: [5, 6], color: "rgb(190, 202, 164)" },
                        { range: [6, 7], color: "rgb(173, 195, 153)" },
                        { range: [7, 8], color: "rgb(154, 188, 144)" },
                        { range: [8, 9], color: "rgb(133, 181, 137)" },
                    ],
                },
            },
        ];

        var layout = {
            title: "<b> Air Quality </b> <br> Index </br>",
            width: 500,
            height: 500,
            margin: { t: 50, r: 25, l: 25, b: 25},
        };
        Plotly.newPlot('gauge', gauge, layout);
    });
}