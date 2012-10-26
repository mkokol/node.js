var Contact = Backbone.Model.extend({
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
    , labels: {
        name: "Name"
        , position: "Position"
        , phone_number: "Pphone number"
    }
    , defaults: {
        name: ""
        , position: ""
        , phone_number: ""
    }
});

