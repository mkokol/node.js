var CompaniesView = Backbone.View.extend({
    el: '#companies'
    , pagePerSide: 2
	, pagingTemplate:"../../tmpl/company-paging.html"
    , events: {
        'click #create-new-company-btn': 'createCompanyModalWnd'
        , 'click .go-to-page': 'goToPage'
    }
    , initialize: function() {
		this.collection.on('add', this.addOne, this);
        this.collection.on('remove', this.render, this);
        this.collection.on('change', this.render, this);
		this.collection.on('reset', this.render, this);
	}
	, render: function() {
		this.$el.find('#companies-grid tbody').empty();
        if(this.collection.length == 0){
            $("#companies-grid").hide();
            $("#company-message").show();
        } else{
            $("#company-message").hide();
            $("#companies-grid").show();
            this.collection.forEach(this.addOne, this);
            this.addPaging();
        }
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
        var totalPages = this.collection.totalPages
        if(totalPages >= 2){
            var _this = this
            , page = this.collection.page;
            var startPage = ((page - this.pagePerSide) >= 1) ? page - this.pagePerSide : 1;
            var lastPage = ((page + this.pagePerSide) <= totalPages) ? page + this.pagePerSide : totalPages;
            var params = {
                page: page
                , startPage: startPage
                , lastPage: lastPage
                , totalPages: totalPages
            }
            $("#pagination").remove();
            fetchTemplate(this.pagingTemplate, function(tmpl) {
                _this.$el.append(tmpl(params));
            });
        }
	}
    , goToPage: function(e){
        e.preventDefault();
        this.collection.fetch(
            parseInt($(e.target).attr("data-page"))
        );
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
        this.collection.fetch(this.collection.page);
    }
});