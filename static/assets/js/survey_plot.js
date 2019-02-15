

function surveyPlot(xValue, yValue) {
    //source x value from SQL db
        var test = [5,8.9];
        console.log(xValue, yValue, test);
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