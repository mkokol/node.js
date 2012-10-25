var CompaniesView = Backbone.View.extend({
	initialize: function() {
		this.collection.on('add', this.addOne, this);
		this.collection.on('reset', this.render, this);
	},
	render: function() {
		this.collection.forEach(this.addOne, this);
	},
	addOne: function(company) {
		var _this = this;
		var companyView = new CompanyView({
			model: company
		});
		companyView.render(function(companyEl) {
			_this.$el.append(companyEl);
		});		
	}
});