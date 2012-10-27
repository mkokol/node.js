var CompaniesView = Backbone.View.extend({
	pagingTemplate: "../../tmpl/paging.html",
	initialize: function() {
		this.collection.on('add', this.addOne, this);
		this.collection.on('reset', this.render, this);
	},
	events: {

	},
	render: function() {
		this.$el.find('table').empty();
		this.collection.forEach(this.addOne, this);
		this.addPaging();
	},
	addOne: function(company) {
		var _this = this,
			companyView = new CompanyView({
				model: company
			});		
		companyView.render(function(companyEl) {
			_this.$el.find('table').append(companyEl);
		});
	},
	addPaging: function() {
		var _this = this,
			total = this.collection.total;
		fetchTemplate(this.pagingTemplate, function(tmpl) {
			_this.$el.find('#paging').html(tmpl());
		});
	}
});