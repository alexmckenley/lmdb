// site/js/app.js

var app = app || {};

$(document).ready(function(){
	new app.MovieListView();
	app.rightSide = new app.MovieDisplayView();
	console.log("Started");
});