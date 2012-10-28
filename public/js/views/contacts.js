var ContactsView = Backbone.View.extend({
    el: ".company-contacts-block",
    tagName: 'tr',
    companyId: null,
	initialize: function() {
        Backbone.Validation.bind(this);
		// add crud listeners
	},
	render: function(callback) {
        this.collection.forEach(this.addOne, this);
	},
    events: {
        'click #create-new-contact-btn': 'showCreateContactModal'
    },
	addOne: function(contact) {
        var _this = this,
			contactView = new ContactView({
				model: contact
			});
		contactView.render(function(companyRendered){
            console.log(_this.$el);
            _this.$el.find('#contacts-grid').append(companyRendered);
		});
	},
    showCreateContactModal: function(){
        console.log("123");
    }
});