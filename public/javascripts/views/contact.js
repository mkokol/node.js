/* template has some unnecesary workaround. see below */
var ContactView = Backbone.View.extend({
	template: function(){ return _.template($('#contactTemplate').html()) },
	initialize: function () {
		this.render();
		$('body').append(this.el);
	},
	render: function(){
		var t = this.template();	
		this.$el.append(t(this.model.toJSON()));
		return this;
	}
});


/* ODD: the code below should work. but underscore "cant replace undefined" from _.template */ 
// var ContactView = Backbone.View.extend({
// 	template: _.template($('#contactTemplate').html()),
// 	initialize: function () {
// 		this.render();
// 		$('body').append(this.el);
// 	},
// 	render: function(){
// 		this.$el.append(this.template(this.model.toJSON()));
// 		return this;
// 	}
// });