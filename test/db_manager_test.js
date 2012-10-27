
GLOBAL.env = "test";

var dbManager = require('../libs/db_manager.js')
    , _ = require("underscore");

var companyData = {
    name: "name"
    , street: "street"
    , street_number: 1
    , city: "city"
    , zip_code: 12345
    , url: "url"
}


exports.testDbManagerCompaniesAddModel = function(test){
    var companyModel = new dbManager.model.Company(companyData);
    companyModel.save(function(err, company){
        test.ok(company);
        test.equal(err, null);
        test.done();
    });
}

exports.testDbManagerCompaniesNonRequiredFieldUrl = function(test){
    testNonRequiredFields(test, "url");
}

exports.testDbManagerCompaniesRequiredFieldName = function(test){
    testRequiredFields(test, "name");
}

exports.testDbManagerCompaniesRequiredFieldStreet = function(test){
    testRequiredFields(test, "street");
}

exports.testDbManagerCompaniesRequiredFieldStreetNumber = function(test){
    testRequiredFields(test, "street_number");
}

exports.testDbManagerCompaniesRequiredFieldCity = function(test){
    testRequiredFields(test, "city");
}

exports.testDbManagerCompaniesRequiredFieldZipCode = function(test){
    testRequiredFields(test, "zip_code");
}

function testNonRequiredFields(test, fieldName){
    var data = _.clone(companyData);
    delete data[fieldName];
    var companyModel = new dbManager.model.Company(data);
    companyModel.save(function(err, company){
        test.ok(company);
        test.equal(err, null);
        test.done();
    });
}

function testRequiredFields(test, fieldName){
    var data = _.clone(companyData);
    delete data[fieldName];
    var companyModel = new dbManager.model.Company(data);
    companyModel.save(function(err, company){
        test.ok(err);
        test.equal(company, undefined);
        test.done();
    });
}

