function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
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

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
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

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata2 = data.metadata;
    var filteredMetadata = metadata2.filter(sampleObj => sampleObj.id == sample)[0];
    //console.log(filteredMetadata);
    
    //  5. Create a variable that holds the first sample in the array.
    var filteredResult = filteredArray[0];
    // console.log(filteredResult);
    // 2. Create a variable that holds the first sample in the metadata array.
    // combined with step 1

    // console.log(filteredResult);
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIDs = filteredResult.otu_ids;
    var otuLabels = filteredResult.otu_labels.slice(0,10).reverse();
    var sampleValues = filteredResult.sample_values.slice(0,10).reverse();

    // 3. Create a variable that holds the washing frequency.
    var washingFreq = filteredMetadata.wfreq;
// ------------------BAR CHART---------------------------------------------------------------
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var yticks = otuIDs.map(sampleObj => "OTU " + sampleObj + " ").slice(0, 10).reverse();
    // console.log(yticks);
  
    // 8. Create the trace for the bar chart. 
    var trace = {
      x: sampleValues,
      y: yticks,
      type: "bar",
      orientation: 'h',
      text: otuLabels
    };
    var barData = [trace];
    
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacterial Cultures Found",
      yaxis: yticks,
      width: 350,
      height: 450,
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
// ------------------BUBBLE CHART---------------------------------------------------------------
    // 1. Create the trace for the bubble chart.
    var trace2 = {
      x: otuIDs,
      y: filteredResult.sample_values,
      text: filteredResult.otu_labels,
      mode: 'markers',
      marker: {
        size: filteredResult.sample_values,
        color: filteredResult.sample_values,
        colorscale: 'YlGnBu',
      },
    };
    var bubbleData = [trace2];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title: "OTU ID"},
      hovermode: 'select',
      width: 1000,
      height: 450,
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 

// ------------------GUAGE CHART---------------------------------------------------------------
    // 4. Create the trace for the gauge chart.
    var titleHTML = d3.select("#gauge");
    var trace3 = {
      value: washingFreq,
      type: "indicator",
      mode: "gauge+number",
      title: {text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
        font: {size: 14}},
      
      gauge: {
        axis: {range: [null, 10]},
        bar: {color: "black"},
        bgcolor: "white",
        borderwidth: 2,
        steps:[
          {range: [0,2], color:"red"},
          {range: [2,4], color:"orange"},
          {range: [4,6], color:"yellow"},
          {range: [6,8], color:"lightgreen"},
          {range: [8,10], color:"forestgreen"}
        ]}
    };
    var gaugeData = [trace3];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     width: 350,
     height: 450,
     margin: { t: 25, r: 25, l: 25, b: 25 }
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}