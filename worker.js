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
  // "The Great Mouse Detective",
  // "fdjksal;",
  // "District 9",
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
          var temp = data.results[0];

          temp['tmdb_id'] = temp.id;
          request.post('http://localhost:3000/movies', {form: temp}, function(err, res, d){
            console.log("Post Completed Successfully: ", d);
          });
          console.dir(temp);
        }
      });

      next();
    }
  }, 1000);
};

next();
