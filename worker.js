var request = require('request');
var qs = require('querystring');
var movieHelpers = require('./movieHelpers');


var apiKey = "2dec8cdc29fffb9f1f310dcce80fed41";
var path = "https://api.themoviedb.org/3/search/movie";
params = {
  api_key: apiKey,
};
var movies = [
  "Network",
  "Soylent Green",
  "Star Wars",
  "The Matrix",
  "The Great Mouse Detective",
  "The Fall",
  "The Hangover 3",
  // "fdjksal;",
  "District 9",
  "Cast Away",
  "The Hobbit",
  "Blue",
  "White",
  "Run Lola Run",
  "Ghostbusters",
  "The Godfather",
  "Casino",
  "Trainspotting",
  "Pulp Fiction"
  // "Home Alone",
  // "Goonies",
  // "Pretty in Pink",
  // "Pretty Woman",
  // "Lord of the Rings",
  // "Some like it hot",
  // "Singing in the rain",
  // "The Sound of Music",
  // "Grease",
  // //Watch this movie
  // "Flight of the Navigator",
  // "Armageddon",
  // "The Color of Money",
  // "Cocktail",
  // "Top Gun",
  // "under seige",
  // "Saving Private Ryan",
  // "Platoon",
  // "Apocalypse Now",
  // "Scarface",
  // "Little Caesar",
  // "The good bad ugly",
  // "Road to perdition",
  // "Chocolat",
  // "Willy Wonka",
  // "the piano teacher",
  // "Nightmare on elm street",
  // "jason",
  // "halloween",
  // "Terminator",
  // "Hellraiser",
  // "robocop",
  // "wargames",
  // "hackers",
  // "2001 space odessey"
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

            request.get('https://api.themoviedb.org/3/movie/' + temp.tmdb_id + '?api_key=2dec8cdc29fffb9f1f310dcce80fed41', function(err, res, data){
              if(err){
                console.log(err);
                movieHelpers.createMovie(temp).then(function(data){
                  console.log("Successfully added ", data.title);
                });
                return;
              }
              data = JSON.parse(data);
              temp.imdb_id = data.imdb_id;

              movieHelpers.createMovie(temp).then(function(data){
                console.log("Successfully added ", data.title);
              });

            });

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
