// ******************************************************************
//
// Global Variables
//
// ******************************************************************

// color range values for map and legend
var vColor5 = '#0D47A1';
var vColor4 = '#1976D2';
var vColor3 = '#1E88E5';
var vColor2 = '#42A5F5';
var vColor1 = '#90CAF9';
var vColor0 = '#E3F2FD';


// set default value for select list
var selProp = "electoral";


// variable to store geo json data acquired from database
var geoData;
geoData = '{"type":"FeatureCollection","features":[' + geo + ']}';
geoData = geoData.replace(/(\r\n|\n|\r)/gm,"").replace(/&#34;/g, '"');
geoData = JSON.parse(geoData);

// create initial map object 
var map = L.map("map-id", {
    center: [37.00, -96.00],
    zoom: 4
});


// ******************************************************************
//
// Properties Selection / Adjust Map Accordingly 
//
// ******************************************************************
function optionChanged(newProp) {
    // pass value from selct list into global variable
    selProp = newProp;  
    
    // remove and recreate map
    map.remove()
    createMap();
    createPlot();
};


// ******************************************************************
//
// Returns array for selected property
//
// ******************************************************************
function getPropGrades() {
    lResult = []

    if (selProp === "electoral") {
        lResult = [0, 5, 10, 15, 20, 30];
    } 
    else if (selProp === "influence_index") {
        lResult = [0, 1.5, 2, 3, 4, 5];
    } 
    else if (selProp === "influence_index_er") {
        lResult = [0, 1.5, 2, 3, 4, 5];
    } 
    else if (selProp === "population") {
        lResult = [0, 1, 3, 5, 10, 20];
    }
    else if (selProp === "swing_state") {
        lResult = [0, .4, .5, .8, .9, 1];
    }
    else if (selProp === "voting_pop_elig") {
        lResult = [0, .7, .72, .74, .76, .78];
    }
    else if (selProp === "voter_turnout") {
        lResult = [0, .45, .50, .55, .60, .65];
    }
    else {
        console.log("BUG - Invalid Property");
    }  

    return lResult;
};


// ******************************************************************
//
// Returns a color based in inputs
//
// ******************************************************************
function getColorMap(props) {  
    let lResult = "";
    let lValue = 0;

    if (selProp === "electoral") {
        lValue = props.electoral;
        lResult = lValue > 30  ? vColor5 :
                  lValue > 20  ? vColor4 :
                  lValue > 15  ? vColor3 :
                  lValue > 10  ? vColor2 :
                  lValue >  5  ? vColor1 :
                                 vColor0;
    } 
    else if (selProp === "influence_index") {
        lValue = props.influence_index;
        lResult = lValue > 5  ? vColor5 :
                  lValue > 4  ? vColor4 :
                  lValue > 3  ? vColor3 :
                  lValue > 2  ? vColor2 :
                  lValue > 1.5  ? vColor1 :
                                vColor0;        
    } 
    else if (selProp === "influence_index_er") {
        lValue = props.influence_index_er;
        lResult = lValue > 5  ? vColor5 :
                  lValue > 4  ? vColor4 :
                  lValue > 3  ? vColor3 :
                  lValue > 2  ? vColor2 :
                  lValue > 1.5  ? vColor1 :
                                vColor0;        
    } 
    else if (selProp === "population") {
        lValue = (props.population/1000000);
        lResult = lValue > 20  ? vColor5 :
                  lValue > 10  ? vColor4 :
                  lValue >  5  ? vColor3 :
                  lValue >  3  ? vColor2 :
                  lValue >  1  ? vColor1 :
                                 vColor0;
    }
    else if (selProp === "swing_state") {
        lValue = (props.swing_state);
        lResult = lValue >=  1  ? vColor5 :
                  lValue >= .9  ? vColor4 :
                  lValue >= .8  ? vColor3 :
                  lValue >= .5  ? vColor2 :
                  lValue >= .4  ? vColor1 :
                                  vColor0;
    }
    else if (selProp === "voting_pop_elig") {
        lValue = (props.voting_pop_elig);
        lResult = lValue > .78  ? vColor5 :
                  lValue > .76  ? vColor4 :
                  lValue > .74  ? vColor3 :
                  lValue > .72  ? vColor2 :
                  lValue > .70  ? vColor1 :
                                  vColor0;
    }
    else if (selProp === "voter_turnout") {
        lValue = (props.voter_turnout);
        lResult = lValue > .65  ? vColor5 :
                  lValue > .6   ? vColor4 :
                  lValue > .55  ? vColor3 :
                  lValue > .50  ? vColor2 :
                  lValue > .45  ? vColor1 :
                                  vColor0;
    }
    else {
        console.log("BUG - Invalid Property")
    }  
    
  return lResult;
}

function getColorLegend(d) {  
    let lResult = "";
    let lValue = d;

    if (selProp === "electoral") {
        lResult = lValue > 30  ? vColor5 :
                  lValue > 20  ? vColor4 :
                  lValue > 15  ? vColor3 :
                  lValue > 10  ? vColor2 :
                  lValue >  5  ? vColor1 :
                                vColor0;
    } 
    else if (selProp === "influence_index") {
        lResult = lValue > 5  ? vColor5 :
                  lValue > 4  ? vColor4 :
                  lValue > 3  ? vColor3 :
                  lValue > 2  ? vColor2 :
                  lValue > 1.5  ? vColor1 :
                                vColor0;
    } 
    else if (selProp === "influence_index_er") {
        lResult = lValue > 5  ? vColor5 :
                  lValue > 4  ? vColor4 :
                  lValue > 3  ? vColor3 :
                  lValue > 2  ? vColor2 :
                  lValue > 1.5  ? vColor1 :
                                vColor0;
    } 
    else if (selProp === "population") {
        lResult = lValue > 20  ? vColor5 :
                  lValue > 10  ? vColor4 :
                  lValue >  5  ? vColor3 :
                  lValue >  3  ? vColor2 :
                  lValue >  1  ? vColor1 :
                                 vColor0;
    }                     
    else if (selProp === "swing_state") {
        lResult = lValue >=  1  ? vColor5 :
                  lValue >= .9  ? vColor4 :
                  lValue >= .8  ? vColor3 :
                  lValue >= .5  ? vColor2 :
                  lValue >= .4  ? vColor1 :
                                  vColor0;
    }                     
    else if (selProp === "voting_pop_elig") {
        lResult = lValue > .78  ? vColor5 :
                  lValue > .76  ? vColor4 :
                  lValue > .74  ? vColor3 :
                  lValue > .72  ? vColor2 :
                  lValue > .70  ? vColor1 :
                                 vColor0;
    }                     
    else if (selProp === "voter_turnout") {
        lResult = lValue > .65  ? vColor5 :
                  lValue > .60  ? vColor4 :
                  lValue > .55  ? vColor3 :
                  lValue > .50  ? vColor2 :
                  lValue > .45  ? vColor1 :
                                 vColor0;
    }                     
    else {
        console.log("BUG - Invalid Property");
    }  
    
    return lResult;

}


// ******************************************************************
//
// Create map
//
// ******************************************************************
function createMap() {

    // ******************************************************************
    //
    // Create the tile layers that will be the background of our map
    //
    // ******************************************************************
    const API_KEY = "pk.eyJ1IjoiYmF5cmV4ciIsImEiOiJjanIzbzBvZGEwOTRkNDNuNXg4NTJmcmIwIn0.ozOI5yWBCVcx5X0yujQVLA";
    var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.light",
      accessToken: API_KEY
    });


    // ******************************************************************
    //
    // Create Map
    //
    // ******************************************************************
    map.remove();
    map = L.map("map-id", {
      center: [37.00, -96.00],
      zoom: 4
    });
    
    map.addControl(new L.Control.Fullscreen());

    // Add our tile layer to the map ... the saltellite will be the default
    lightmap.addTo(map);


    function style(feature) {
      return {
          //fillColor: getColor(feature.properties.influence_index),
          fillColor: getColorMap(feature.properties),
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7
      };
    }

    // variable used to store geoJSON layer 
    var geojson;

    // ... our listeners
    geojson = L.geoJson(geoData, {style: style}).addTo(map);


    // ******************************************************************
    //
    // Add Interaction
    //
    // ******************************************************************
    function highlightFeature(e) {
      var layer = e.target;

      layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
      }

      info.update(layer.feature.properties);
    }

    function resetHighlight(e) {
      geojson.resetStyle(e.target);
      info.update();  
    }

    function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
    }

    function onEachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
    }

    geojson = L.geoJson(geoData, {
    style: style,
    onEachFeature: onEachFeature
    }).addTo(map);


    // ******************************************************************
    //
    // Custom Control
    //
    // ******************************************************************
    var info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    function getInfoProp (props) {
      let x_result = "";
      
      if (selProp === "electoral") {
          x_result = props.electoral + ' Electoral Votes';
      } 
      else if (selProp === "influence_index") {
          x_result = props.influence_index + ' Influence Index';
      } 
      else if (selProp === "influence_index_er") {
          x_result = props.influence_index_er + ' Influence Index (Eligible)';
      } 
      else if (selProp === "population") {
          x_result = props.population + ' Population';
      }
      else if (selProp === "swing_state") {
          x_result = props.swing_state + ' Swing State Percentage';
      }
      else if (selProp === "voting_pop_elig") {
          x_result = props.voting_pop_elig + ' Voter Population Eligible';
      }
      else if (selProp === "voter_turnout") {
          x_result = props.voter_turnout + ' Voter Turnout';
      }
      else {
          console.log("BUG - Invalid Property")
      }  
      
      return x_result;
    }


    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
        this._div.innerHTML = '<h4>State Breakdown</h4>' +  (props ?
            '<b>' + props.state + '</b><br />' + getInfoProp(props)
            : 'Hover over a state');
    };

    info.addTo(map);



    // ******************************************************************
    //
    // Create Legend
    //
    // ******************************************************************
    // Create a legend to display information about our map
    var legend = L.control({position: 'bottomright'});

        legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend'),
                selPropGrades = getPropGrades();
                labels = [];

            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 0; i < selPropGrades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColorLegend(selPropGrades[i] + .01) + '"></i> ' +
                    selPropGrades[i] + (selPropGrades[i + 1] ? '&ndash;' + selPropGrades[i + 1] + '<br>' : '+');
            }

            return div;
        };

        legend.addTo(map);

}


function init() {
    createMap();
    createPlot();
};

 init();