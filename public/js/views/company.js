var CompanyView = Backbone.View.extend({
	tagName: 'tr',
    template: '../../tmpl/company-row.html',
	formTemplate: '../tmpl/new-company-form.html',
	editFormTemplate: '../tmpl/edit-company-form.html',
	initialize: function() {
        Backbone.Validation.bind(this);
		//add listeners for crud
		this.model.on('destroy', this.removeCompanyView, this);
		this.model.on('change', this.render, this);
	},
	render: function(callback) {
		var _this = this;
		fetchTemplate(_this.template, function(tmpl) {
			_this.$el.html( tmpl(_this.model.toJSON() ));
			if(_.isFunction(callback)) {
				callback(_this.el);
			}
		});
        $(this.el).attr('id', 'company-' + _this.model.get("_id"));
	},
	events: {
		'click .contacts-company' : 'showContacts',
		'click .edit-company': 'editCompany',
		'click .remove-company': 'removeCompanyModel'
		
	},	
	removeCompanyModel: function() {
		this.model.destroy();
	},
	removeCompanyView: function() {
		this.$el.remove();
	},
	editCompany: function(callback) {
		var modelData = this.model.toJSON(),
			labels = this.model.labels,
			_this = this,
			modal = new ModalWindow(),
			fields = {}

		// throw away unnecesary properties i.e id
		for(key in modelData) {
			if(_.has(labels, key)) fields[key] = {data: modelData[key], label:labels[key]}
		}

		fetchTemplate(_this.editFormTemplate, function(tmpl) {
			var renderedForm = tmpl(fields);
			modal.$el.html(renderedForm);
			modal.appendToDom().show();
			modal.$el.on('submit', function(e) {
				e.preventDefault();
                var data = {}
				modal.$el.find('input').each(function(i, el) {
					var $el = $(el);
                    data[$el.attr('name')] = $el.val();
				});
                _this.model.set(data);
                var validationErrors = _this.model.validate();
                if(_this.model.isValid()){
                    _this.model.save();
				    modal.close();
                }else{
                    _this.showValidationErrors(validationErrors);
                }
			});
		});
	},
	drawForm: function(callback) {
		var labels = this.model.labels,
			_this = this;

		fetchTemplate(_this.formTemplate, function(tmpl) {
			var renderedForm = tmpl(labels);
			if(_.isFunction(callback)) {
				callback(renderedForm);
			}
		});
	},
	showContacts: function(){
        var contactsData = this.model.get('contacts');
        for(var key in contactsData){
            contactsData[key].company_id = this.model.get("_id");
        }
        var contacts = new Contacts(contactsData);
		var contactsView = new ContactsView({collection: contacts});
        contactsView.companyId = this.model.get("_id");
		contactsView.render();
	},
    showValidationErrors: function(errors){
        for(key in errors){
            $("#control-group-company-" + key).addClass("error");
            $("#help-inline-company-" + key).html(errors[key]);
        }
    }
});