// site/js/views/MovieListView.js

var app = app || {};

app.MovieListView = Backbone.View.extend({
	el: '#movies',
	
	initialize: function (initialMovies){
		this.collection = new app.MovieList(initialMovies);
		this.render();
		//console.log("MLV");
	},
	
	render: function() {
		this.collection.each(function( item ){
			this.renderMovieListEntry( item );
		}, this );
		//console.log(this.collection);
	},
	
	renderMovieListEntry: function( item ){
		var movieListEntryView = new app.MovieListEntryView({
			model: item
		});
		this.$el.append( movieListEntryView.render().el );
	}
	
});