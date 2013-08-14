// site/js/models/movie.js

var app = app || {};

app.Movie = Backbone.Model.extend({
	defaults: {
		poster: "img/placeholder.png",
		title: "No title",
		year: 9999
	}
});