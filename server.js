
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var movieHelpers = require('./movieHelpers');
var mongoose = require('mongoose');

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
  movieHelpers.getMovies().then(function(data){
    res.send(data);
  }).fail(function(err){
    res.send(500, { error: 'something blew up', data: err });
  });
});

app.post('/movies', function(req, res){
  // console.log(req.body);
  movieHelpers.createMovie(req.body).then(function(movie){
    res.send(movie);
  }).fail(function(err){
    res.send(500, { error: 'something blew up', data: err });
  });
});

app.put('/movies/:id', function(req, res){
  movieHelpers.updateMovie(req.params.id, req.body).then(function(movie){
    res.send(movie);
  }).fail(function(err){
    res.send(500, { error: 'something blew up', data: err });
  });
});

app.get('movies/:id/update', function(req, res){
  movieHelpers.scrapeMovie(req.params.id).then(function(movie){
    res.send(movie);
  }).fail(function(err){
    res.send(500, { error: 'something blew up', data: err });
  });
});

app.get('*', routes.index);




// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Magic happens on port ' + app.get('port'));
});
