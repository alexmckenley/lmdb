var App = App || new Backbone.Marionette.Application();


App.on('start', function(options) { 
  App.addRegions({ 
    main: "#main",
    rightside: '#rightside'
  });
  // var itemView = new App.MovieListEntryView({model: new App.Movie(options.movies[0])});
  // App.main.show(itemView);
  var movies = new App.MovieList(options.movies);
  var movieListView = new App.MovieListView({
    collection: movies
  });
  App.main.show(movieListView);
  Backbone.history.start();
});

$(document).ready(function(){
  var movies = [ 
    { title: 'Wet Cat' },
    { title: 'Bitey Cat' },
    { title: 'Surprised Cat' }
  ];
	App.start({movies: movies});
	console.log("Started");
});