var ContactsView = Backbone.View.extend({
	tagName: 'tr',
	template: '../tmpl/contacts.html',
	initialize: function() {
        Backbone.Validation.bind(this);
		// add crud listeners
	},	
	render: function(callback) {
		// add self table render. else pass as callback
		this.$el.find('table tbody').empty();
		this.collection.forEach(this.addOne, this);
	},
	addOne: function(contact) {
		var _this = this,
			contactView = new ContactView({
				model: contact
			});
		contactView.render(function(companyRendered){
			_this.$el.find('table').append(companyRendered);
		});
	}
});