/**
 * company model with validation params and field labels for create and edit form
 *
 * @type {*}
 */
var Company = Backbone.Model.extend({
    idAttribute: "_id"
    , urlRoot: "/company"
    , validation: {
        name: {
            required: true
            , msg: "Name is required"
        }
        , street: {
            required: true
            , msg: "Street is required"
        }
        , street_number: [
            {
                required: true
                , msg: "Street number is required"
            }
            ,{
                pattern: "digits"
                , msg: "Only digits are allowed"
            }
        ]
        , city: {
            required: true
            , msg: "City is required"
        }
        , zip_code: [
            {
                required: true
                , msg: "Zip code is required"
            }
            ,{
                pattern: "digits"
                , msg: "Only digits are allowed"
            }
        ]
    }
    , labels: {
        name: "Name*"
        , street: "Street*"
        , street_number: "Street Number*"
        , city: "City*"
        , zip_code: "Zip code*"
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