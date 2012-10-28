var Contact = Backbone.Model.extend({
    idAttribute: "_id"
    , urlRoot: '/contact'
    , validation: {
        name: {
            required: true
            , msg: "Name is required"
        }
        , position: {
            required: true
            , msg: "Position is required"
        }
        , phone_number: {
            required: true
            , msg: "Phone number is required"
        }
    }
    , labels: {
        name: "Name*"
        , position: "Position*"
        , phone_number: "Phone number*"
    }
    , defaults: {
        name: ""
        , position: ""
        , phone_number: ""
    }
});

