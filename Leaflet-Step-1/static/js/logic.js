// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
    //console.log(data);

  });


// Function that will determine the color of a marker based on the magnitude of the earthquake by  size and and depth of the earthquake
function chooseColor(depth) {
    if(depth > 90)
        {return "red"}  
    else if (depth>70)
        {return "dark orange"}   
    else if (depth>50)
        {return "orange"}

    else if (depth>30)
        {return "yellow"}
    else if (depth>10)
        {return "lightgreen"}
    else if (depth<10)
        {return "green"}
    else
        {return "black"}
    
  }


//   console.log(chooseColor(91))
//   console.log(chooseColor(75))
//   console.log(chooseColor(50.5))
//   console.log(chooseColor(32.5))
//   console.log(chooseColor(12.5))
//   console.log(chooseColor(2.5))

 ///Create earthquake layer
 
 
function createFeatures(earthquakeData) {
    console.log(earthquakeData);
    // Define a function we want to run once for each feature in the features array

    // Give each feature a popup describing the place, time, magnitude and co-ordinates of the earthquake
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>"
        + "</h3><hr><p>Magnitude: " + feature.properties.mag + "</p>"
        + "</h3><hr><p>Depth: " + feature.geometry.coordinates[2] + "</p>");

    }


    ///Function to define marker style
    function markerStyle(feature){

        var marker_color = chooseColor(feature.geometry.coordinates[2])


        var marker_size = feature.properties.mag * 3.5
        //console.log(feature.geometry.coordinates[2])
        //console.log(marker_color)
        return{

            stroke: false,
            fillOpacity: 0.75,
            color: "black",
            fillColor: marker_color,
            radius: marker_size
        }


    }



    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,

        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },

        style: markerStyle

        



    });

    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes);
}

function createMap(earthquakes) {

    // Define lightmap and satellitemap layers
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openlightmap.org/copyright'>Openlightmap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/light-v10",
      accessToken: API_KEY
    });
  
    var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openlightmap.org/\">Openlightmap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "satellite-v9",
      accessToken: API_KEY
    });
  
    // Define a baseMaps object to hold our base layers
    var baseMaps = {
      "Light Map": lightmap,
      "Satellite Map": satellitemap
    };
  
    // Create overlay object to hold our overlay layer
    var overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create our map, giving it the lightmap and earthquakes layers to display on load
    var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [lightmap, earthquakes]
    });
  
    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  }
  