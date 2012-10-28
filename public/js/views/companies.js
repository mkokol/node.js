var CompaniesView = Backbone.View.extend({
    el: '#companies'
	, pagingTemplate:"../../tmpl/company-paging.html"
    , events: {
        'click #create-new-company-btn': 'createCompanyModalWnd'
    }
    , initialize: function() {
		this.collection.on('add', this.addOne, this);
		this.collection.on('reset', this.render, this);
	}
	, render: function() {
		this.$el.find('#companies-grid tbody').empty();
		this.collection.forEach(this.addOne, this);
		this.addPaging();
	}
	, addOne: function(company) {
		var _this = this
        , companyView = new CompanyView({
            model: company
        });
		companyView.render(function(company) {
            _this.$el.find('#companies-grid').append(company);
		});
	}
	, addPaging: function() {
		var _this = this,
			total = this.collection.total;
		fetchTemplate(this.pagingTemplate, function(tmpl) {
			_this.$el.append(tmpl());
		});
	}
    , createCompanyModalWnd: function() {
        var _this = this
        , company = new Company()
        , modal = new ModalWindow({model: company});
        modal.render(
            "Create company"
            , function(model){delete modal; _this.updateCollection()}
        );
    }
    , updateCollection: function(){
        this.collection.fetch()
    }
});