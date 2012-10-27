$(function() {
    new App({
        el: $('body')
    });
});


var App = Backbone.View.extend({
    initialize: function() {
        this.initCompanies();
    },
    events: {
        'click #create-new-company-btn': 'showCreateCompanyModal'
    },
    initCompanies: function() {
        this.companies = new Companies();
        var companiesView = new CompaniesView({
            collection: this.companies,
            el: $('#companies')
        });
        this.companies.fetch();
    },
    showCreateCompanyModal: function() {
        var _this = this,
            modal = new ModalWindow(),
            newCompany = new Company(),
            newCompanyView = new CompanyView({
                model: newCompany
            });

        newCompanyView.drawForm(function(renderedForm) {
            modal.$el.html(renderedForm);
            modal.appendToDom().show();
            modal.$el.on('submit', function(e) {
                e.preventDefault();
                $(".control-group").removeClass("error");
                $(".help-inline").html("");
                modal.$el.find('input').each(function(i, el) {
                    var $el = $(el);
                    // newCompany.set didn't work for new model((
                    newCompany.attributes[$el.attr('name')] = $el.val();
                });
                var validationErrors = newCompany.validate();
                if(newCompany.isValid()){
                    newCompany.save();
                    _this.companies.fetch();
                    modal.close();
                }else{
                    newCompanyView.showValidationErrors(validationErrors);
                }
            });
        });
    }
});