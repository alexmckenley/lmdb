var mongoose = require('mongoose');
var request = require('request');
var qs = require('querystring');
var Q = require('q');


var apiKey = "2dec8cdc29fffb9f1f310dcce80fed41";
var path = "https://api.themoviedb.org/3/search/movie";
params = {
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
  date_added: Date
});

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
  Movie.findById(id, function(err, model){
    if(err){
      d.reject(err);
    } else {
      model.filename = movie.filename;
      model.save(function(err, m){
        if(err){
          d.reject(err);
          console.log("error saving model");
          return;
        }
        d.resolve(m);
      });
    }
  });

  return d.promise;
};

exports.scrapeMovie = function(id){

};









