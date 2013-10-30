// $(document).ready(function(){
// 	new app.MovieListView();
// 	app.rightSide = new app.MovieDisplayView();
// 	console.log("Started");
// });

var App = new Backbone.Marionette.Application();
App.on('start', function(options) { 
  App.addRegions({ 
    main: "#app",
    rightside: '#rightside'
  });
  Backbone.history.start();
});

var TodoApp = new (Backbone.Router.extend({
  routes: { "": "index",
  		    "movies/:id": "show" }, // This route does not work at all yet

  initialize: function(){
    this.movieList = new MovieList();
    this.movieListView = new MovieListView({collection: this.movieList});
    $('#app').html(this.movieListView.el);
  },
  start: function(){
    Backbone.history.start({pushState: true});
  },
  index: function(){
    this.movieList.fetch();
  },
  show: function(id){
    //this.todoList.focusOnTodoItem(id);
  }
}));

$(document).ready(function(){
	App.start();
	console.log("Started");
});