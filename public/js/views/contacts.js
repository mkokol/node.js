var ContactsView = Backbone.View.extend({
	tagName: 'tr',
    companyId: "123",
	template: '../tmpl/contacts.html',
    previewBlockTemplate: '../tmpl/contacts-preview-block.html',
	initialize: function() {
        Backbone.Validation.bind(this);
		// add crud listeners
	},
    events: {
        'click #create-new-contact-btn': 'showCreateContactModal'
    },
	render: function(callback) {
        var _this = this;
		fetchTemplate(_this.previewBlockTemplate, function(tmpl) {
            $("#company-" + _this.companyId).after(tmpl());
            _this.buildGrid();
        });
	},
    buildGrid: function(){
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
	},
    showCreateContactModal: function(){
        console.log("123");
    }
});