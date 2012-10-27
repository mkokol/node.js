var ContactView = Backbone.View.extend({
	tagName: 'tr',
	template: '../../tmpl/contact.html',
	initialize: function() {
		
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