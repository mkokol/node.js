var CompanyView = Backbone.View.extend({
	tagName: 'tr',
	template: '../../tmpl/company-row.html',
	formTemplate: '../tmpl/new-company-form.html',
	initialize: function() {
		//add listeners for crud
		this.model.on('destroy', this.removeCompanyView, this);
	},
	render: function(callback) {
		var _this = this;
		fetchTemplate(_this.template, function(tmpl) {
			_this.el.innerHTML = tmpl(_this.model.toJSON());
			if(_.isFunction(callback)) {
				callback(_this.el);
			}
		});
	},
	events: {
		'click .remove-company' : 'removeCompanyModel'
	},
	removeCompanyModel: function(){
		this.model.destroy();		
	},
	removeCompanyView: function(){
		this.$el.remove();
	},
	drawForm: function(callback) {
		var labels = this.model.labels,
			_this = this;

		fetchTemplate(_this.formTemplate, function(tmpl) {
			var renderedForm = tmpl(labels);
			if(_.isFunction(callback)) {
				callback(renderedForm);
			}
		});
	}	
});