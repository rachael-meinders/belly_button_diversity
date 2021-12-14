function init() {
  // grab reference to dropdown select element
    var selector = d3.select("#selDataset");
  
    // load json file and print to console
    d3.json("samples.json").then((data) => {
      console.log(data);
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
  
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
  
    });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var filteredArray = samples.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var filteredResult = filteredArray[0];

    console.log(filteredResult);
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIDs = filteredResult.otu_ids;
    var otuLabels = filteredResult.otu_labels;
    var sampleValues = filteredResult.sample_values;

    //console.log(otuIDs);
    //console.log(otuLabels);
    //console.log(sampleValues);

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    // var yticks = 

    // 8. Create the trace for the bar chart. 
    // var barData = [
      
    // ];
    // 9. Create the layout for the bar chart. 
    // var barLayout = {
     
    // };
    // 10. Use Plotly to plot the data with the layout. 
    
  });
}