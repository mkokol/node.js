var ContactView = Backbone.View.extend({
	tagName: 'tr',
	template: '../../tmpl/contact-row.html',
	initialize: function() {
        Backbone.Validation.bind(this);
	},
	render: function(callback) {
        var _this = this;
		fetchTemplate(_this.template, function(tmpl) {
			_this.el.innerHTML = tmpl(_this.model.toJSON());
			if(_.isFunction(callback)) {
				callback(_this.el);
			}
		});
	},
    events: {

        'click .edit-contact': 'editContactsModal',
        'click .remove-contact': 'removeContactModel'

    },
    editContactsModal: function(){
        console.log("editContactsModal");
    },
    removeContactModel: function(){
        console.log("removeContactModel");
    }
});