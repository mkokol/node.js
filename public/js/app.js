$(function() {
    var companies = new Companies();
    var companiesView = new CompaniesView({
        el: $('#companies')
        , collection: companies
    });
    companies.fetch();
});