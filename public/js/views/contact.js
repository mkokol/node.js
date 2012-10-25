var ContactView = Backbone.View.extend({
	template: '../../tmpl/contact.html',
	initialize: function() {
		this.render(function(html){ $('body').append(html); });		
	},
	render: function(callback) {
		var _this = this;
		fetchTemplate(_this.template, function(tmpl) {
			_this.el.innerHTML = tmpl(_this.model.toJSON());
			if(_.isFunction(callback)) {
				callback(_this.el);
			}
		});
	}
});