
/*
 * Company's contact controller.
 */

var dbManager = require('../libs/db_manager');
var responseHandler = require('../libs/response_handler');

/**
 * add company's contact to mongoDb
 *
 * @param req
 * @param res
 */
exports.post = function(req, res){
    var id = req.param("company_id", null);
    if(id != null){
        dbManager.model.Company.findOne({_id: id}, function(err, company){
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
                    res.send({ company: companydData });
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
                    res.send({ company: companydData });
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
                    company.contacts =  company.contacts.slice(key, 1);
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
                    res.send({ company: companydData });
                }
            });
        } else {
            responseHandler.badRequest(res, "Company not found");
        }
    });
}