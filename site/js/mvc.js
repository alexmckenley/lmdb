var App = App || new Backbone.Marionette.Application();

///// MODELS /////
App.Movie = Backbone.Model.extend({
	defaults: {
		poster: "img/placeholder.png",
		title: "No title",
		year: 9999
	}
});



///// COLLECTIONS /////
App.MovieList = Backbone.Collection.extend({
	model: App.Movie,
	url: '/movies'
});



///// VIEWS /////
App.MovieListEntryView = Backbone.Marionette.ItemView.extend({
	el: '#main',
	className: 'movieListEntry',
	template: '#movieListEntry'
});

App.MovieListView = Backbone.Marionette.CompositeView.extend({
	el: '#main',
	itemView: App.MovieListEntryView
	// appendHtml: function(collectionView, itemView) {
	// 	collectionView.$("#app").append(itemView.el);
	// }
});