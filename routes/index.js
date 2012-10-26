
/*
 * GET home page.
 */

dbManager = require('../libs/DbManager.js');

exports.index = function(req, res){
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

    res.render('index', { title: 'World' });
};