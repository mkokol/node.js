
/*
 * GET home page.
 */

dbManager = require('../libs/DbManager.js');

exports.popup = function(req, res){
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

//    dbManager.model.Company.find().execFind(function (arr, data) {
//        data[1].contact.push(
//            {
//                "name": "test name"
//                , "position": "test position"
//                , "phone_number": 54321
//            }
//        );
//        data[1].save();
//    });

    res.render('popup');
};