var mongoose = require('mongoose');
var request = require('request');
var qs = require('querystring');
var Q = require('q');


var apiKey = "2dec8cdc29fffb9f1f310dcce80fed41";
var path = "https://api.themoviedb.org/3/search/movie";
var params = {
  api_key: apiKey,
};


mongoose.connect('mongodb://localhost/lmdb');

var Movie = mongoose.model('Movie', {
  adult: Boolean,
  backdrop_path: String, //'/nPBDOLBPdBapuhcv4xXopHX9BAE.jpg',
  tmdb_id: Number, //17654,
  original_title: String, //'District 9',
  release_date: Date, //'2009-08-14',
  poster_path: String, //'/axFmCRNQsW6Bto8XuJKo08MPPV5.jpg',
  popularity: Number, //6.08283452937599,
  title: String, //'District 9',
  vote_average: Number, //6.7,
  vote_count: Number, //746 }
  filename: String,
  date_added: Date,
  imdb_id: String
});

exports.getMovie = function(id){
  var d = Q.defer();

  Movie.findById(id, function(err, data){
    if(err){
      console.log("Error:", err);
      d.reject(err);
      return;
    }
    d.resolve(data);
  });

  return d.promise;
};

exports.getMovies = function() {
  var d = Q.defer();

  Movie.find(function(err, data){
    if(err){
      console.log("Error:", err);
      d.reject(err);
      return;
    }
    d.resolve(data);
  });

  return d.promise;
};

exports.createMovie = function(movie){
  var d =  Q.defer();

  var mov = new Movie(movie);
  mov.save(function(err, movie){
    if(err){
      console.log("ERROR Saving Movie", err);
      d.reject(err);
      return;
    }
    console.log("Created Movie Successfully: ", movie.title);
    d.resolve(movie);
  });

  return d.promise;
};


exports.updateMovie = function(id, movie){
  var d = Q.defer();
  delete movie._id;
  Movie.findByIdAndUpdate(id, movie, function(err, model){
    if(err){
      d.reject(err);
    } else {
      d.resolve(model);
    }
  });

  return d.promise;
};

exports.rescrapeMovie = function(id){
  var d = Q.defer();

  exports.getMovie(id).then(function(movie){
    params.query = movie.filename;
    var url = path + '?' + qs.stringify(params);
    console.log(url);

    request.get(url, function(err, res, data){
      if(err){
        d.reject(err);
      } else {
        data = JSON.parse(data);
        if(data.results && data.results.length >= 1){
          var temp = data.results[0];

          temp['tmdb_id'] = temp.id;
          temp.popularity = Math.round(temp.popularity * 100) / 100;

          exports.updateMovie(id, temp).then(function(data){
            d.resolve(data);
            console.log("Found: ", temp.title);
          }).fail(function(err){
            d.reject(err);
          });
        } else {
          console.log("there were no results", res);
        }
      }
    });

  }).fail(function(err){
    d.reject(err);
  });


  return d.promise;
};



exports.getRotten = function(movie){
  var d = Q.defer();
  var params = qs.stringify({q: movie.title});
  url = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=grezzzwmedtqq494w3wzzurk&" + params;

  request.get(url, function(err, res, data){
    if(err){
      d.reject(err);
    } else {
      JSON.parse(data);
      movie.ratings = data && data.movies && data.movies[0].ratings;
      d.resolve(movie);
    }
  });

  return d.promise;
};

















