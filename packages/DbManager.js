
var mongoose = require("mongoose");

function DbManager(){
    function createConnection(){
        return db = mongoose.createConnection('localhost', 'messages');
    }

    return {
        "createConnection" : createConnection
    };
}

module.exports.zero = {zero:0};
module.exports = DbManager();
module.exports.one = {one:1};
module.exports.two = {two:2};

