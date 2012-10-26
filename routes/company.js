
/*
 * GET home page.
 */

var dbManager = require('../libs/DbManager.js');

exports.get = function(req, res){
    var page = req.param("page", 1);
    dbManager.model.Company.find()
        .paginate(page, 2, function(err, records, total) {
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
    res.send({ status: 'saccess' });
};