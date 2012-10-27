
function responseHandler(){

    function badRequest(res, message){
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ message: message }));
    }

    return {
        badRequest: badRequest
    }

}

module.exports = responseHandler();