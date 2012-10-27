
GLOBAL.env = "test";

var dbManager = require('../libs/db_manager.js')
    , _ = require("underscore");

var companyData = {
    name: "name"
    , street: "street"
    , street_number: 1
    , city: "city"
    , zip_code: "zip_code"
    , url: "url"
}

exports.testDbManagerCompanies = function(test){
    var requiredFields = [ "name", "street", "street_number", "city", "zip_code" ];
    var nonRequiredFields = [ "url"];
    for( var key in requiredFields) {
        var data = _.clone(companyData);
        delete data[requiredFields[0]];
        var companyModel = new dbManager.model.Company(data);
        companyModel.save(function(err, companydData){
            test.ok(err);
        });
    }
    test.done();
};