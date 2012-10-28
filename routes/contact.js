
/*
 * Company's contact controller.
 */

var dbManager = require('../libs/db_manager');
var responseHandler = require('../libs/response_handler');


/**
 * fetching json data of contact
 *
 * @param req
 * @param res
 */

exports.get = function(req, res){
    var companyId = req.param("companyId", "");
    if(companyId != NaN){
        var ObjectId = require('mongoose').Types.ObjectId;
        dbManager.model.Company.findOne({_id: ObjectId(companyId)}, function(err, company){
            if(err){
                responseHandler.badRequest(res, "Error fetching company list");
            }else{
                res.send(company.contacts);
            }
        });
    } else {
        responseHandler.badRequest(res, "Incorrect type of the parameter \"companyId\"");
    }
};


/**
 * add company's contact to mongoDb
 *
 * @param req
 * @param res
 */
exports.post = function(req, res){
    var id = req.param("company_id", null);
    if(id != null){
        var ObjectId = require('mongoose').Types.ObjectId;
        dbManager.model.Company.findOne({_id: ObjectId(id)}, function(err, company){
            company.contacts.push(
                {
                    "name": req.param("name", null)
                    , "position": req.param("position", null)
                    , "phone_number": req.param("phone_number", null)
                }
            );
            company.save(function(err, companydData){
                if(err){
                    if(err.name == "ValidationError"){
                        responseHandler.badRequest(res, "Please fill all required fields");
                    } else{
                        responseHandler.badRequest(res, "Error saving company");
                    }
                }else{
                    res.send(companydData);
                }
            });
        });
    } else {
        responseHandler.badRequest(res, "Parameter \"company_id\" is required");
    }
};

/**
 * update company's contact in mongoDb
 *
 * @param req
 * @param res
 */
exports.put = function(req, res){
    var id = req.params.id;
    var ObjectId = require('mongoose').Types.ObjectId;
    dbManager.model.Company.findOne({"contacts._id": new ObjectId(id)}, function(err, company){
        var contact = null;
        for (var key in company.contacts) {
            if(company.contacts[key]._id == id) {
                contact = company.contacts[key];
                break;
            }
        }
        if(contact){
            contact.name = req.param("name", null);
            contact.position = req.param("position", null);
            contact.phone_number = req.param("phone_number", null);
            company.save(function(err, companydData){
                if(err){
                    if(err.name == "ValidationError"){
                        responseHandler.badRequest(res, "Please fill all required fields");
                    } else{
                        responseHandler.badRequest(res, "Error saving company");
                    }
                }else{
                    res.send({});
                }
            });
        } else {
            responseHandler.badRequest(res, "Company not found");
        }
    });
};

exports.delete = function(req, res){
    var id = req.params.id;
    var ObjectId = require('mongoose').Types.ObjectId;
    dbManager.model.Company.findOne({"contacts._id": new ObjectId(id)}, function(err, company){
        if(company != null){
            for (var key in company.contacts) {
                if(company.contacts[key]._id == id) {
                    delete company.contacts.splice(key, 1);
                    break;
                }
            }
            company.save(function(err, companydData){
                if(err){
                    if(err.name == "ValidationError"){
                        responseHandler.badRequest(res, "Please fill all required fields");
                    } else{
                        responseHandler.badRequest(res, "Error saving company");
                    }
                }else{
                    res.send({});
                }
            });
        } else {
            responseHandler.badRequest(res, "Company not found");
        }
    });
}