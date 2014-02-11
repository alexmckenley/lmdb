var request = require('request');
var qs = require('querystring');


var apiKey = "2dec8cdc29fffb9f1f310dcce80fed41";
var path = "https://api.themoviedb.org/3/search/movie";
params = {
  api_key: apiKey,
};
var movies = [
  "300",
  "Star Wars",
  "The Matrix",
  "The Great Mouse Detective",
  "The Fall",
  "The Hangover 3",
  
  // "fdjksal;",
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
        if(!err){
          data = JSON.parse(data);
          if(data.results && data.results.length >= 1){
            var temp = data.results[0];

            temp['tmdb_id'] = temp.id;
            temp.filename = params.query;
            temp.date_added = (new Date()).toISOString();
            temp.popularity = Math.round(temp.popularity * 100) / 100;
            request.post('http://localhost:3000/movies', {form: temp}, function(err, res, d){
              console.log("Movie Created Successfully: ", JSON.parse(d).title);
            });
            console.log("Found: ", temp.title);
          } else {
            console.log("there were no results", res);
          }
        } else {
          console.log("ERR: ", err);
        }
      });

      next();
    }
  }, 1000);
};

next();
