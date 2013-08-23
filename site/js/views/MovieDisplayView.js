// site/js/views/MovieDisplayView.js

var app = app || {};

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