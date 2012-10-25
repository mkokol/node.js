var CompanyView = Backbone.View.extend({
	tagName: 'tr',
	template : '../../templates/company-row.html',
	initialize: function () {
		this.render(function(html){ $('#companies').append(html); });
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