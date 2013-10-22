var app = app || {};


///// MODELS /////
app.Movie = Backbone.Model.extend({
	defaults: {
		poster: "img/placeholder.png",
		title: "No title",
		year: 9999
	}
});



///// COLLECTIONS /////
var app = app || {};

app.MovieList = Backbone.Collection.extend({
    model: app.Movie,
	url: '/movies'
});



///// VIEWS /////
app.MovieDisplayView = Backbone.View.extend({
	el: '#rightside',
	template: _.template($('#movieDisplay').html()),
	initialize: function (){
		this.model = new app.Movie({
			poster: "<-----",
			title: "Please select a movie",
			year: "<-----"
		});
		
		//this.render();
		
		this.listenTo( this.model, 'change', this.render );
	},
	
	render: function() {
		//console.log("Rendered Display");
		//console.log(this.model);
		this.$el.html( this.template( this.model.toJSON() ) );

		return this;
	}
	
});

app.MovieListEntryView = Backbone.View.extend({
	tagName: 'div',
	className: 'movieListEntry',
	template: _.template($('#movieListEntry').html()),
	events: {"click" : "updateDisplay"},
	render: function(){
		this.$el.html( this.template( this.model.toJSON() ) );
		//console.log(this);
		return this;
	},
	updateDisplay: function (){
		//console.log(this.model);
		app.rightSide.model.set(this.model.toJSON());
	}
});

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

