
/**
 *
 */

require('mongoose-pagination');

var config = require('../config.js')
  , mongoose = require("mongoose");

function dbManager(){
    var db;
    var model = {};
    var rowsPerPage = config.paging.count;

    function createConnection(){
        db = mongoose.createConnection(config.db[env].host, config.db[env].name);
    }

    function initDbSchema(){
        // Create a schema for our data
        var ContactSchema = new mongoose.Schema({
            name: { type: String, required: true },
            position: { type: String, required: true },
            phone_number: { type: String, required: true }
        });
        model.Contact = db.model('Contact', ContactSchema);

        var CompanySchema = new mongoose.Schema({
            name: { type: String, required: true },
            street: { type: String, required: true },
            street_number: { type: Number, required: true },
            city: { type: String, required: true },
            zip_code: { type: Number, required: true },
            url: { type: String },
            contacts: { type: [ContactSchema] }
        });
        model.Company = db.model('Company', CompanySchema);
    }

    createConnection();
    initDbSchema();

    return {
        "rowsPerPage" : rowsPerPage
        , "model": model
    };
}

module.exports = dbManager();