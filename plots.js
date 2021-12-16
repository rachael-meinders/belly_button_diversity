function init() {
  // grab reference to dropdown select element
    var selector = d3.select("#selDataset");
  
    // load json file and print to console
    d3.json("samples.json").then((data) => {
      // console.log(data);
      // use json file to populate dropdown
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

// when drop down option changes, call buildMetadata and buildCharts
function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }

// Demographics panel
function buildMetadata(sample) {
  // load json
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      // Filter the data for the object with the desired sample #
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      // use d3 to select panel with id of "#sample-metadata"
      var PANEL = d3.select("#sample-metadata");

      // console.log(result);
      PANEL.html("");
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
  
    });
}