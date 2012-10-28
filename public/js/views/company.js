var CompanyView = Backbone.View.extend({
	tagName: 'tr'
    , template: '../../tmpl/company-row.html'
    , previewContactsBlockTemplate: '../tmpl/contacts-preview-block.html'
	, initialize: function() {
		this.model.on('destroy', this.removeCompanyView, this);
		this.model.on('change', this.render, this);
	}
	, render: function(callback) {
		var _this = this;
		fetchTemplate(_this.template, function(tmpl) {
			_this.$el.html( tmpl(_this.model.toJSON() ));
			if(_.isFunction(callback)) {
				callback(_this.el);
			}
		});
        $(this.el).attr('id', 'company-' + _this.model.get("_id"));
	}
	, events: {
		'click .contacts-company' : 'showContacts',
		'click .edit-company': 'editCompanyModalWnd',
		'click .remove-company': 'removeCompany'
		
	}
	, removeCompany: function() {
		this.model.destroy();
	}
	, removeCompanyView: function() {
		this.$el.remove();
	}
    , editCompanyModalWnd: function(callback) {
        var modal = new ModalWindow({model: this.model});
        modal.render(
            "Edit company"
            , function(model){delete modal;}
        );
	}
	, showContacts: function(){
        $(".company-contacts-block").remove();
        var companyId = this.model.get("_id");
        var contactsData = this.model.get('contacts');
        fetchTemplate(this.previewContactsBlockTemplate, function(tmpl) {
            $("#company-" + companyId).after(tmpl(contactsData.length));
            for(var key in contactsData){
                contactsData[key].company_id = companyId;
            }
            var contacts = new Contacts(contactsData);
            var contactsView = new ContactsView({collection: contacts});
            contactsView.companyId = companyId;
            contactsView.render();
        });
	}
});