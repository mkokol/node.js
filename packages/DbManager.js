
var mongoose = require("mongoose");

function createConnection(){
    return db = mongoose.createConnection('localhost', 'messages');
}

var DbManager = {
    "createConnection" : createConnection
};

module.exports.zero = {zero:0};

module.exports = DbManager;
three = 3;
three1 = 3;

module.exports.one = {one:1};
module.exports.two = {two:2};

