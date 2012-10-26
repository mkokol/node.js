
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
            res.send({'total': total, 'records': records});
        });;
};

exports.put = function(req, res){
    res.send({ status: 'saccess' });
};

exports.post = function(req, res){
    res.send({ status: 'saccess' });
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