var Companies = Backbone.Collection.extend({
	model: Company
    , url: '/company'
    , page: 1
    , totalPages: 0
    , fetch: function(page) {
        Backbone.Collection.prototype.fetch.call(this, {
            data: { page: page},
            processData:true
        });
    }
    , parse: function(data) {
        this.page = data.page;
        this.totalPages = data.totalPages;
        return data.records;
    }
});