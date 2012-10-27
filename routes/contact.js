
/*
 * Company's contact controller.
 */

var dbManager = require('../libs/db_manager');
var responseHandler = require('../libs/response_handler');

exports.get = function(req, res){
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
            if(err.name == "ValidationError"){
                responseHandler.badRequest(res, "Please fill all required fields");
            }
            responseHandler.badRequest(res, "Error seving companys");
        }else{
            res.send({ company: companydData });
        }
    });
}
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
                    "name": req.param("name", null)
                    , "position": req.param("position", null)
                    , "phone_number": req.param("phone_number", null)
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



