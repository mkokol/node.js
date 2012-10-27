var CompaniesView = Backbone.View.extend({
    pagingTemplate: "../../tmpl/paging.html",
	initialize: function() {
		this.collection.on('add', this.addOne, this);
		this.collection.on('reset', this.render, this);
	},
	render: function() {
		this.collection.forEach(this.addOne, this);
        this.addPging();
	},
	addOne: function(company) {
		var _this = this;
		var companyView = new CompanyView({
			model: company
		});
		console.log(company.toJSON());
		companyView.render(function(companyEl) {
			_this.$el.append(companyEl);
		});		
	},
    addPging: function(){
        var total = this.collection.total;
        fetchTemplate(this.pagingTemplate, function(tmpl){
//            $("#paging").html(tmpl());
        });
    }
});