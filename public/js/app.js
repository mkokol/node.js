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
            companies.fetch({
                success: function(collection, response) {
                    var companiesView = new CompaniesView({
                        collection: companies,
                        el: $('#companies')
                    });
                    companiesView.render();
                },
                error: function(collection, response) {
                    console.log(collection, response, 'error');
                }
            });
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
            $('#create-new-company').submit(function(e){
                e.preventDefault();
                //newCompany.save();
                return false;
            });
            $('.closeModal').click(function(){
                modal.modal('hide');
            });
            console.log('im in modal');
        }
    });
    var app = new App({
        el: $('body')
    });
});