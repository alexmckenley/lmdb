// site/js/views/MovieListView.js

var app = app || {};

app.MovieListView = Backbone.View.extend({
	el: '#movies',
	
	initialize: function (){
		this.collection = new app.MovieList();
		this.collection.fetch({reset: true});
		this.render();
		//console.log("MLV");
		
		this.listenTo( this.collection, 'add', this.renderMovieListEntry );
		this.listenTo( this.collection, 'reset', this.render );
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