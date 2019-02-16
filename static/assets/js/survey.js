// Take in user data and store into a table inside our DB

//Variable for route to table db
// var dataRoute = [];

//get radio button value
function getRadioVal(form, name) {
    var val;
    // get list of radio buttons with specified name
    var radios = form.elements[name];
    
    // loop through list of radio buttons
    for (var i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) { // radio checked?
            val = radios[i].value; // if so, hold its value in val
            break; // and break out of for loop
        }
    }
    return val; // return value of checked radio or undefined if none checked
}


//Select vote button
function handleClick(vote) {
    event.preventDefault();

    var voteValue = getRadioVal(document.getElementById('vote_form'), "vote");
    console.log(voteValue);
    //Seet session stage variable to reference and hide survey once vote posted
    sessionStorage.setItem('voted', true);
    // https://voter-influence.herokuapp.com
    route = '/apiV1.0/post_results/'+voteValue;
    console.log(route);
    location.href = route;
};

//Reset survey table button
function dbReset() {
    console.log('dbReset()');
    var apiRoute = '/apiV1.0/reset'; 
    location.href = apiRoute;
};

//Refresh survey plot data
function dbRefresh() {
    console.log('dbRefresh()');
    var apiRoute = '/apiV1.0/refresh'; 
    location.href = apiRoute;
};


// Use D3 `.on` to attach a click handler for the upvote
// castedVote.on("click", function(value) {
//     // Select the current count
//     var currentCount = parseInt(counter.text());
  
//     // Upvotes should increment the counter
//     currentCount += 1;
  
//     // BONUS: Save the vote data
//     dataRoute.push(["castedVote", currentCount]);
//   });