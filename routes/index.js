
/*
 * GET home page.
 */

dbManager = require('../libs/DbManager.js');

exports.index = function(req, res){
//    var company = new dbManager.model.Company(
//        {
//            "name": "test name"
//            , "street": "test street"
//            , "street_number": 1
//            , "city": "test city"
//            , "zip_code": 12345
//        }
//    );
//    company.save(function(err){
//        if(err){
//            res.render('error', { title: 'World' });
//        }else{
//            res.render('index', { title: 'World' });
//        }
//    });

    dbManager.model.Company.find().execFind(function (arr, data) {
        console.log(data[0]);
        data[0].contact = new dbManager.model.Contact(
            {
                "name": "test name"
                , "position": "test position"
                , "phone_number": 54321
            }
        );
    });

    res.render('index', { title: 'World' });
};