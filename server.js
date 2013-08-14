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

//Get movie by ID
app.get("/movies/:id", function(request, response){
	return MovieModel.findByID(request.params.id, function( err, movie){
		if (!err){
			return response.send(movie);
		}else {
			return console.log( err );
		}
	});
});

//Update a book
app.put("/movies/:id", function(request, response){
	console.log("updating movie " + request.body.title);
	return MovieModel.findById(request.params.id, function(err, movie){
		movie.title = request.body.title;
		movie.year = request.body.year;
		movie.poster = request.body.poster;
		
		return movie.save(function (err){
			if (!err){
				console.log(movie.title + " successfully updated");
			} else {
				console.log(err);
			}
			return response.send(movie);
		});
	});
});

//Delete a book
app.delete( "/movies/:id", function(request, response){
	console.log("deleting movie with id: " + request.params.id );
	return MovieModel.findById( request.params.id, function(err, movie){
		return movie.remove(function(err){
			if (!err){
				console.log("Book removed");
				return response.send("");
			}else{
				console.log(err);
			}
		});
	});
});


//This adds a new movie each time the program is ran
var test = new MovieModel({
		title: "This is a Movie Title",
		year: "1997",
		poster: "http://sobr.co/s.svg"
	});
test.save();





































