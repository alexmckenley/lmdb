// $(document).ready(function(){
// 	new app.MovieListView();
// 	app.rightSide = new app.MovieDisplayView();
// 	console.log("Started");
// });

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
	TodoApp.start();
	console.log("Started");
});