var static = require('node-static');
 
//
// Create a node-static server instance to serve the './public' folder
//
var file = new static.Server('../public');
 
require('http').createServer(function (request, response) {
    request.addListener('end', function () {

        response.setHeader('accept', '*'); 
        response.setHeader('Access-Control-Allow-Origin', '*'); 
        response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); 

        file.serve(request, response);
    }).resume();
}).listen(3000);