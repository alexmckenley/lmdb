// site/js/app.js

var app = app || {};

$(document).ready(function(){
	var movies = [
		{ title: 'Movie Name Sample', year: 1991, poster: '/img/sample.jpg'},
		{ title: 'Movie Two', year: 1992, poster: '/img/sample.jpg'},
		{ title: 'The Third', year: 1993, poster: '/img/sample.jpg'},
		{ title: 'FOUR IS MORE!', year: 1994, poster: '/img/sample.jpg'},
		{ title: 'Movie Name Sample', year: 1991, poster: '/img/sample.jpg'},
		{ title: 'Movie Two', year: 1992, poster: '/img/sample.jpg'},
		{ title: 'The Third', year: 1993, poster: '/img/sample.jpg'},
		{ title: 'FOUR IS MORE!', year: 1994, poster: '/img/sample.jpg'}
	];
	
	new app.MovieListView( movies );
	console.log("Started");
});