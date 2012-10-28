var Contacts = Backbone.Collection.extend({
	model: Contact
    , url: '/contact'
    , fetch: function(companyId) {
        Backbone.Collection.prototype.fetch.call(this, {
            data: { companyId: companyId},
            processData:true
        });
    }
})