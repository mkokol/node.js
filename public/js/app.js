$(function() {
    var App = Backbone.View.extend({
        initialize: function() {
            this.initCompanies();
        },
        events: {
            'click #create-new-company-btn': 'showCreateCompanyModal'
        },
        initCompanies: function() {
            var companies = new Companies();
            var companiesView = new CompaniesView({
                collection: companies,
                el: $('#companies')
            });
            companies.fetch();
        },
        showCreateCompanyModal: function() {
            var modal = new ModalWindow({
                id: 'modal-wnd'
            }),
                newCompany = new Company(),
                newCompanyView = new CompanyView({
                    model: newCompany
                });
                newCompanyView.ttt = 76575;

            newCompanyView.drawForm(function(renderedForm) {
                modal.$el.html(renderedForm);
                modal.appendToDom();
                modal.$el.modal('show');
            });
        }
    });
    var app = new App({
        el: $('body')
    });
});