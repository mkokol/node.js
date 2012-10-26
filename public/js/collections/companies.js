var Companies = Backbone.Collection.extend({
	model: Company
	, url: '/company'
    , total: 0
    , parse: function(data) {
        this.total = data.total;
        return data.records;
    }
});