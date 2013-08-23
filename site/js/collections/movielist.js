// site/js/collections/MovieList.js

var app = app || {};

app.MovieList = Backbone.Collection.extend({
    model: app.Movie,
	url: '/movies'
});