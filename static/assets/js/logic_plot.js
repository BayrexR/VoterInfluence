function createPlot() {
    // Trace1 for the Population (fixed axis)
    var trace1 = {
        x: mpState,
        y: mpPopulation,
        text: mpState,
        name: "Population",
        type: "line"
    };
    
    //  
    // Determine dynamic second axis based on selProp value 
    //
    var trace2Name = "";
    var trace2Y = [];
    var trace2YTitle = ""

    if (selProp === "electoral") {
        trace2Name = "Electoral";
        trace2Y = mpElectoral;
        trace2YTitle = "Electoral"    
    } 
    else if (selProp === "influence_index") {
        trace2Name = "Influence Index";
        trace2Y = mpInfluenceIndex;
        trace2YTitle = "Influence Index (electorate per million)"    
    } 
    else if (selProp === "influence_index_er") {
        trace2Name = "Influence Index (Eligible)";
        trace2Y = mpInfluenceIndex;
        trace2YTitle = "Influence Index Eligible (electorate per million)"    
    } 
    else if (selProp === "population") {
        trace2Name = "Population";
        trace2Y = mpPopulation;
        trace2YTitle = "Population"    
    }
    else if (selProp === "swing_state") {
        trace2Name = "Swing State";
        trace2Y = mpSwingState;
        trace2YTitle = "Swing State"    
    }
    else if (selProp === "voting_pop_elig") {
        trace2Name = "Voting Populatoin Eligible";
        trace2Y = mpVotingPopElig;
        trace2YTitle = "Voting Populatoin Eligible"    
    }
    else if (selProp === "voter_turnout") {
        trace2Name = "Voter Turout";
        trace2Y = mpVoterTurnout;
        trace2YTitle = "Voter Turnout"    
    }
    else {
        console.log("BUG - Invalid Property");
    }  


    // Trace 2 for the selProp (Dynamic)
    var trace2 = {
        x: mpState,
        //y: mpInfluenceIndex,
        y: trace2Y,
        text: mpState,
        //name: "Index",
        name: trace2Name,
        type: "line",
        yaxis: 'y2'
    };

    // Combining both traces
    var data = [trace1, trace2];

    // Create custom layout
    var layout = {
        //title: "Population vs. Influence",
        yaxis: {title: 'Population (million)'},
        yaxis2: {
        //title: 'Infulence (electorate per million)',
        title: trace2YTitle,
        titlefont: {color: 'rgb(148, 103, 189)'},
        tickfont: {color: 'rgb(148, 103, 189)'},
        overlaying: 'y',
        side: 'right'
        },
        margin: {
            t: 20, //top margin
            l: 50, //left margin
            r: 50, //right margin
            b: 140 //bottom margin
        }    
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot-id", data, layout);
}    


var pieColors = ['#E3F2FD', '#1E88E5', '#0D47A1']


// ******************************************************************
//
// Swing States Pie Chart
//
// ******************************************************************
var pieSwingStateData = [{
    values: pieSwingStateValue,
    labels: pieSwingStateLabel,
    type: 'pie',
    hole: .4,
    marker: {
        colors: pieColors
      }, 
    textinfo: 'value'      
  }];
  
var pieSwingStateLayout = {
    title: "Swing States",
    height: 400,
    width: 400
  };

  Plotly.newPlot('plot-swing-states-id', pieSwingStateData, pieSwingStateLayout);


// ******************************************************************
//
// Swing Electoral Pie Chart
//
// ******************************************************************
var pieSwingElectoralData = [{
    values: pieSwingElectoralValue,
    labels: pieSwingElectoralLabel,
    type: 'pie',
    hole: .4,
    marker: {
        colors: pieColors
      }, 
    textinfo: 'value'   
  }];
  
var pieSwingElectoralLayout = {
    title: "Swing Electoral Volatility",
    height: 400,
    width: 400
  };
  
  Plotly.newPlot('plot-swing-electoral-id', pieSwingElectoralData, pieSwingElectoralLayout);


// ******************************************************************
//
// Swing Turnout Pie Chart
//
// ******************************************************************
var pieSwingTurnoutData = [{
    values: pieSwingTurnoutValue,
    labels: pieSwingTurnoutLabel,
    type: 'pie',
    hole: .4,
    marker: {
        colors: pieColors
      }, 
    textinfo: 'value'   
  }];
  
var pieSwingTurnoutLayout = {
    title: "Swing Voter Turnout",
    height: 400,
    width: 400
  };
  
  Plotly.newPlot('plot-swing-turnout-id', pieSwingTurnoutData, pieSwingTurnoutLayout);


// ******************************************************************
//
// Swing Population Pie Chart
//
// ******************************************************************
var pieSwingPopulationData = [{
    values: pieSwingPopulationValue,
    labels: pieSwingPopulationLabel,
    type: 'pie',
    hole: .4,
    marker: {
        colors: pieColors
      }, 
    textinfo: 'value'   
  }];
  
var pieSwingPopulationLayout = {
    title: "Swing Population",
    height: 400,
    width: 400
  };
  
  Plotly.newPlot('plot-swing-population-id', pieSwingPopulationData, pieSwingPopulationLayout);  