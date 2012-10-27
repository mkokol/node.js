
/*
 * Company controller.
 */

var dbManager = require('../libs/db_manager.js');
var responseHandler = require('../libs/response_handler');

/**
 * fetching json data of companies with pagination
 *
 * @param req
 * @param res
 */
exports.get = function(req, res){
    var page = Number(req.param("page", 1));
    if(page != NaN){
        dbManager.model.Company.find()
            .paginate(page, dbManager.rowsPerPage, function(err, records, total) {
                if(err){
                    responseHandler.badRequest(res, "Error fetching companys");
                }else{
                    res.send({ status: 'success', 'total': total, 'records': records });
                }
            });
    } else {
        responseHandler.badRequest(res, "Incorrect type of the parameter \"page\"");
    }
};

/**
 * add new company to mongoDb
 *
 * @param req
 * @param res
 */
exports.post = function(req, res){
    var companyModel = new dbManager.model.Company({
        name: req.param("name", null)
        , street: req.param("street", null)
        , street_number: req.param("street_number", null)
        , city: req.param("city", null)
        , zip_code: req.param("zip_code", null)
        , url: req.param("url", null)
    });
    companyModel.save(function(err, companydData){
        if(err){
            res.send({ status: 'error'});
        }else{
            res.send({ status: 'success', company: companydData });
        }
    });
};

/**
 * update company in mongoDb
 *
 * @param req
 * @param res
 */
exports.put = function(req, res){
    var id = req.param("id", null);
    if(id != null){
        dbManager.model.Company.findOne({_id: id}, function(err, company){
            company.name = req.param("name", null);
            company.street = req.param("street", null);
            company.street_number = req.param("street_number", null);
            company.city = req.param("city", null);
            company.zip_code = req.param("zip_code", null);
            company.url = req.param("url", null);
            company.save(function(err, companydData){
                if(err){
                    res.send({ status: 'error'});
                }else{
                    res.send({ status: 'success'});
                }
            });
        });
    }
};

/**
 * delete company with contacts from mongoDb
 *
 * @param req
 * @param res
 */
exports.delete = function(req, res){
    var id = req.param("id", null);
    if(id != null){
        dbManager.model.Company.findOne({_id: id}, function(err, company){
            company.key_to_delete = undefined;
            company.remove(function(err){
                if(err){
                    res.send({ status: 'error', "id": id });
                }else{
                    res.send({ status: 'success', "id": id });
                }
            });
        });
    }
};