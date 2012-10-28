var ContactsView = Backbone.View.extend({
    el: ".company-contacts-block"
    , tagName: "tr"
    , companyId: null
    , events: {
        'click #create-new-contact-btn': "showCreateContactModal"
    }
    , initialize: function() {
        //add listeners for crud
        this.collection.on('change', this.render, this);
    }
    , render: function(callback) {
        this.$el.find("#contacts-grid  tbody").empty();
        if(this.collection.length == 0){
            $("#contact-message").show();
            $("#contacts-grid").hide();
        }else{
            this.collection.forEach(this.addOne, this);
        }
	}
    , addOne: function(contact) {
        var _this = this
        , contactView = new ContactView({
            model: contact
        });
		contactView.render(function(companyRendered){
            _this.$el.find('#contacts-grid').append(companyRendered);
		});
	}
    , showCreateContactModal: function(){
        var _this = this
        , contact = new Contact();
        contact.attributes["company_id"] = this.companyId;
        var modal = new ModalWindow({model: contact});
        modal.render(
            "Create contacts"
            , function(model){delete modal; _this.updateCollection(model)}
        );
    }
    , updateCollection: function(model){
        $("#contact-message").hide();
        $("#contacts-grid").show();
        this.collection.add(model);
        this.render();
    }
});