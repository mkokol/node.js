$(function() {
    var App = Backbone.View.extend({
        initialize: function() {
            this.initCompanies();
        },
        events: {

        },
        initCompanies: function() {
            var companies = new Companies();
            companies.fetch({
                success: function(collection, response) {
                    var companiesView = new CompaniesView({
                        collection: companies
                    });
                    companiesView.render();
                    console.log(collection, response, 'success');
                },
                error: function(collection, response) {
                    console.log(collection, response, 'error');
                }
            });            
        }
    });
    var app = new App();
});