var CompanyView = Backbone.View.extend({
	tagName: 'tr',
	template: '../../tmpl/company-row.html',
	formTemplate: '../tmpl/new-company-form.html',
	editFormTemplate: '../tmpl/edit-company-form.html',
	initialize: function() {
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
			if(_.has(labels, key)) fields[key] = modelData[key]
		}

		fetchTemplate(_this.editFormTemplate, function(tmpl) {
			var renderedForm = tmpl(fields);
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
				_this.model.save(data);
				modal.close();
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
		var contacts = new Contacts(this.model.get('contacts'));
		var contactsView = new ContactsView({collection: contacts});
		contactsView.render();
	}
});