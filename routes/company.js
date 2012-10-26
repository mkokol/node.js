
/*
 * Company controller.
 */

var dbManager = require('../libs/DbManager.js');

/**
 * fetching json data of companies with pagination
 *
 * @param req
 * @param res
 */
exports.get = function(req, res){
    var page = req.param("page", 1);
    dbManager.model.Company.find()
        .paginate(page, dbManager.rowsPerPage, function(err, records, total) {
            res.send({ status: 'saccess', 'total': total, 'records': records });
        });;
};

/**
 * save new company to mongoDb
 *
 * @param req
 * @param res
 */
exports.put = function(req, res){
    var companyModel = new dbManager.model.Company({
        name: req.param("name", null)
        , street: req.param("street", null)
        , street_number: req.param("streetNumber", null)
        , city: req.param("city", null)
        , zip_code: req.param("zipCode", null)
        , url: req.param("url", null)
    });
    companyModel.save(function(err, companydData){
        if(err){
            res.send({ status: 'error'});
        }else{
            res.send({ status: 'saccess', company: companydData });
        }
    });
};

exports.post = function(req, res){
    var id = req.param("id", null);
    if(id != null){
        dbManager.model.Company.findOne({_id: id}, function(err, company){
            company.name = req.param("name", null);
            company.street = req.param("street", null);
            company.street_number = req.param("streetNumber", null);
            company.city = req.param("city", null);
            company.zip_code = req.param("zipCode", null);
            company.url = req.param("url", null);
            company.save(function(err, companydData){
                if(err){
                    res.send({ status: 'error'});
                }else{
                    res.send({ status: 'saccess'});
                }
            });
        });
    }
};

exports.delete = function(req, res){
    var id = req.param("id", null);
    if(id != null){
        dbManager.model.Company.findOne({_id: id}, function(err, company){
            company.key_to_delete = undefined;
            company.remove(function(err){
                if(err){
                    res.send({ status: 'error', "id": id });
                }else{
                    res.send({ status: 'saccess', "id": id });
                }
            });
        });
    }
};