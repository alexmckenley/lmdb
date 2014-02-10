var request = require('request');
var qs = require('querystring');


var apiKey = "2dec8cdc29fffb9f1f310dcce80fed41";
var path = "https://api.themoviedb.org/3/search/movie";
params = {
  api_key: apiKey,
};
var movies = [
  // "300",
  // "Star Wars",
  // "The Matrix",
  "The Great Mouse Detective",
  "fdjksal;",
  "District 9",
  "Cast Away"
];

var next = function(){
  setTimeout(function(){
    if (movies.length > 0) {
      params.query = movies.pop();
      url = path + "?" + qs.stringify(params);
      console.log(url);

      request.get(url, function(err, res, data){
        console.dir(JSON.parse(data).results[0]);
      });

      next();
    }
  }, 1000);
};

next();
