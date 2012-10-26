
/*
 * Company's contact controller.
 */

var dbManager = require('../libs/DbManager.js');

exports.put = function(req, res){
    var id = req.param("id", null);
    if(id != null){
        dbManager.model.Company.findOne({_id: id}, function(err, company){
            data[1].contacts.push(
                {
                    "name": "test name"
                    , "position": "test position"
                    , "phone_number": 54321
                }
            );
            data[1].save();
        });
    }

    res.render('popup');
};