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

        newCompanyView.drawForm(function(renderedForm) {
            modal.$el.html(renderedForm);
            modal.appendToDom().show();
            modal.$el.on('submit', function(e) {
                e.preventDefault();
                var data = {};
                modal.$el.find('input').each(function(i, el) {
                    var $el = $(el),
                        key = $el.attr('name'),
                        value = $el.val();
                    data[key] = value;
                });
                newCompany.save(data);
                modal.close();
            });
        });
    }
});