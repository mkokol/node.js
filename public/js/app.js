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
            var modal = $("#modal-wnd"),
                newCompany = new Company(),
                newCompanyView = new CompanyView({
                    model: newCompany
                });

            newCompanyView.drawForm(function(renderedForm) {
                modal.html(renderedForm);
                modal.modal('show');
            });

            // modal events ...
            $('#create-new-company').on('submit', function(e) {
                e.preventDefault();
                //newCompany.save();
                return false;
            });
            $('.closeModal').on('click', function() {
                modal.modal('hide');
            });
            console.log('im in modal');
        }
    });
    var app = new App({
        el: $('body')
    });
});