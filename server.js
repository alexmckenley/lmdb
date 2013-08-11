//Dependencies:
var root_dir = __dirname;
var express = require("express");
var path = require("path");
var mongoose = require("mongoose");

//Connect to MongoDB
mongoose.connect("mongodb://localhost/movies");

//Schemas
var MovieSchema = new mongoose.Schema({
	title: String,
	year: Number,
	poster: String
});

//Models
var MovieModel = mongoose.model("Movie", MovieSchema);


//Create express server
var app = express();

// Configure server
app.configure( function() {
    //parses request body and populates request.body
    app.use( express.bodyParser() );

    //checks request.body for HTTP method overrides
    app.use( express.methodOverride() );

    //perform route lookup based on url and HTTP method
    app.use( app.router );

    //Where to serve static content
    app.use( express.static( path.join( root_dir, 'site') ) );

    //Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//Start Server
var port = 9000;
app.listen( port, function(){
	console.log( "Express server listening on port " + port + " in " + app.settings.env );
});

//Fetch all movies
app.get( "/movies", function(request, response){
	return MovieModel.find(function(err, movies){
		if (!err){
			return response.send( movies );
		}
		else{
			return console.log(err);
		}
	});
});

//Create new movie
app.post("/movies", function(request, response){
	var movie = new MovieModel({
		title: request.body.title,
		year: request.body.year,
		poster: request.body.poster
	});
	movie.save(function(err){
		if(!err)
			return console.log('created');
		else
			return console.log(err);
			
	});
	return response.send(movie);
});

















