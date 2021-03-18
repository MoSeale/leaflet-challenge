// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
    //console.log(data);

  });


function createFeatures(earthquakeData) {
    console.log(earthquakeData);
// // Define a function we want to run once for each feature in the features array
// // Give each feature a popup describing the place and time of the earthquake
// function onEachFeature(feature, layer) {
//     layer.bindPopup("<h3>" + feature.properties.place +
//     "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
// }

// // Create a GeoJSON layer containing the features array on the earthquakeData object
// // Run the onEachFeature function once for each piece of data in the array
// var earthquakes = L.geoJSON(earthquakeData, {
//     onEachFeature: onEachFeature
// });

// // Sending our earthquakes layer to the createMap function
// createMap(earthquakes);
}

