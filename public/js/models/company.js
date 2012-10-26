var Company = Backbone.Model.extend({
    validation: {
        name: {
            required: true
            , msg: "Name is required"
        }
        , Street: {
            required: true
            , msg: "Street is required"
        }
        , street_number: [
            {
                required: true
                , msg: "Street number is required"
            }
            ,{
                pattern: /^0-9/
                , msg: "Only digits is allowed"
            }
        ]
        , city: {
            required: true
            , msg: "Phone number is required"
        }
        , zip_code: [
            {
                required: true
                , msg: "Phone number is required"
            }
            ,{
                pattern: /^0-9/
                , msg: "Only digits is allowed"
            }
        ]
    }
    , labels: {
        name: "Name"
        , street: "Street"
        , street_number: "Street Number"
        , city: "City"
        , zip_code: "Zip code"
        , url : "Url"
    }
    , defaults: {
        name: ""
        , street: ""
        , street_number: ""
        , city: ""
        , zip_code: ""
        , url : ""
    }
});