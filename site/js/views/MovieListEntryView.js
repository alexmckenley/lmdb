// site/js/views/MovieListEntryView.js

var app = app || {};

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