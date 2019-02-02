// Take in user data and store into a table inside our DB

//Variable for route to table db
var dataRoute = [];

//Select vote button
function handleClick(this) {
    var voteValue = this.value;
    localRoute = '/postRoute'
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