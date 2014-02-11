
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

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

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('/movies', function(req, res){
  Movie.find(function(err, data){
    if(err){
      console.log("Error:", err);
    }
    res.send(data);
  });
});

app.post('/movies', function(req, res){
  // console.log(req.body);
  var mov = new Movie(req.body);
  mov.save(function(err){
    if(err){
      console.log("ERROR Saving Movie", err);
    }
    console.log("Created Movie Successfully: ", req.body.title);
  });
  res.send(req.body);
});

app.get('*', routes.index);




// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Magic happens on port ' + app.get('port'));
});
