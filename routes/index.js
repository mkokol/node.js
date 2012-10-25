
/*
 * GET home page.
 */
var dbManager = require('../packages/DbManager.js');

console.log(dbManager.one);

exports.index = function(req, res){

   dbManager.createConnection();


//    var Schema = mongoose.Schema;
//
//
//
//    // Create a schema for our data
//    var MessageSchema = new Schema({
//        message: String,
//        text: String
//    });
//
//    // Use the schema to register a model with MongoDb
//    var Message = db.model('Message', MessageSchema);
//
//
//    var mess = new Message({"message":"test", "text":"msg test"});
//
//    mess.save(function (err) {
//        if (err) // ...
//            res.render('error', { title: 'World' });
//        else
//            res.render('index', { title: 'World' });
//
//    });
    res.render('index', { title: 'World' });
};