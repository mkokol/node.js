var Companies = Backbone.Collection.extend({
	model: Company
	, url: '/company'
    , parse: function(data) {
        return data.records;
    }
});