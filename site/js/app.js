var App = App || new Backbone.Marionette.Application();


App.on('start', function(options) { 
  App.addRegions({ 
    main: "#app",
    rightside: '#rightside'
  });
  var itemView = new App.MovieListEntryView({model: options.movies[0]});
  App.main.show(itemView);
  // var movieListView = new App.MovieListView({
  //   collection: options.movies
  // });
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