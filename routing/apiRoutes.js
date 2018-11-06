
// Friends Data
var friendsData = require('../data/friends.js');


// Routes
function apiRoutes(app) {

  // A GET route with the url /api/friends. 
  app.get('/api/friends', function (req, res) {
    res.json(friendsData);
  });

  // A POST routes /api/friends. 
  app.post('/api/friends', function (req, res) {

    // Parse new friend input to get integers (AJAX post seemed to make the numbers strings)
    var newFriend = {
      name: req.body.name,
      photo: req.body.photo,
      scores: []
    };
    var scoresArray = [];
    for(var i=0; i < req.body.scores.length; i++){
      scoresArray.push( parseInt(req.body.scores[i]) )
    }
    newFriend.scores = scoresArray;


    
    var scoreComparisionArray = [];
    for(var i=0; i < friendsData.length; i++){

     
      var currentComparison = 0;
      for(var j=0; j < newFriend.scores.length; j++){
        currentComparison += Math.abs( newFriend.scores[j] - friendsData[i].scores[j] );
      }

     
      scoreComparisionArray.push(currentComparison);
    }

    
    var bestMatchPosition = 0; 
    for(var i=1; i < scoreComparisionArray.length; i++){
      
      
      if(scoreComparisionArray[i] <= scoreComparisionArray[bestMatchPosition]){
        bestMatchPosition = i;
      }

    }

    
    var bestFriendMatch = friendsData[bestMatchPosition];



    // Reply with a JSON object of the best match
    res.json(bestFriendMatch);



    // Push the new friend to the friends data array for storage
    friendsData.push(newFriend);

  });

}


// Export for use in main server.js file
module.exports = apiRoutes;