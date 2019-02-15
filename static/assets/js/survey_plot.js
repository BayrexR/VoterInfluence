

function surveyPlot(xValue, yValue) {
    //source x value from SQL db
       console.log(xValue, yValue);
        var surveyTrace = {
            //x = yes, no, idk variables from SQL db
            x: xValue,
            y: yValue,
            name: 'Class Survey Results',
            type: 'bar'
             
        };
    
        var data = [surveyTrace]
    
        var layout = {
            yaxis:{title: 'Number of Votes'},
            titlefont: {color: 'rgb(148, 103, 189)'}
    
        };
    
    Plotly.newPlot("VoteResults", data, layout);
    };

    surveyPlot(xValue, yValue);