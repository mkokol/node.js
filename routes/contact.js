
/*
 * Company's contact controller.
 */

var dbManager = require('../libs/DbManager.js');

/**
 * add company's contact to mongoDb
 *
 * @param req
 * @param res
 */
exports.post = function(req, res){
    var id = req.param("id", null);
    if(id != null){
        dbManager.model.Company.findOne({_id: id}, function(err, company){
            company.contacts.push(
                {
                    "name": "test name"
                    , "position": "test position"
                    , "phone_number": 54321
                }
            );
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
 * update company's contact in mongoDb
 *
 * @param req
 * @param res
 */
exports.put = function(req, res){
    var id = req.param("id", "5089972a35af6bc80d000002");
    var contactId = req.param("contactId", "5089972a35af6bc80d000002");
    if(id != null && contactId != null){
        dbManager.model.Company.findOne({_id: id}, function(err, company){
            var contact = null;
            for (var key in company.contacts) {
                if(company.contacts[key]._id == contactId) {
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
                        res.send({ status: 'error'});
                    }else{
                        res.send({ status: 'success'});
                    }
                });
            }
            res.send({ status: 'success', company: company});
        });
    }
};



