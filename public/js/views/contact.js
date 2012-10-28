var ContactView = Backbone.View.extend({
	tagName: 'tr'
	, template: '../../tmpl/contact-row.html'
    , initialize: function() {
        this.model.on('destroy', this.removeContactView, this);
        this.model.on('change', this.render, this);
    }
	, render: function(callback) {
        var _this = this;
		fetchTemplate(_this.template, function(tmpl) {
			_this.el.innerHTML = tmpl(_this.model.toJSON());
			if(_.isFunction(callback)) {
				callback(_this.el);
			}
		});
	}
    , events: {
        'click .edit-contact': 'editContactsModalWnd'
        , 'click .remove-contact': 'removeContactModel'
    }
    , editContactsModalWnd: function(){
        var modal = new ModalWindow({model: this.model});
        modal.render(
            "Edit contacts"
            , function(model){delete modal;})
    }
    , removeContactModel: function(){
        this.model.destroy();
    }
    , removeContactView: function(){
        this.$el.remove();
    }
});