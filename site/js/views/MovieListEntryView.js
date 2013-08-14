// site/js/views/MovieListEntryView.js

var app = app || {};

app.MovieListEntryView = Backbone.View.extend({
	tagName: 'div',
	className: 'movieListEntry',
	template: _.template($('#movieListEntry').html()),
	render: function(){
		this.$el.html( this.template( this.model.toJSON() ) );
		//console.log(this);
		return this;
	}
});