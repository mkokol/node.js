
/*
 * GET home page.
 */

dbManager = require('../libs/DbManager.js');

exports.index = function(req, res){
//    var mess = new dbManager.model.Message({"message":"test", "text":"msg test"});
//    mess.save(function(err){
//        if(err){
//            res.render('error', { title: 'World' });
//        }else{
//            res.render('index', { title: 'World' });
//        }
//    });
    res.render('index', { title: 'World' });
};