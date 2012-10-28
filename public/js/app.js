$(function() {
    var companies = new Companies();
    var companiesView = new CompaniesView({
        collection: companies,
        el: $('#companies')
    });
    companies.fetch();
});