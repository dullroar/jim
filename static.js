/* jslint node: true */
"option strict";
var static = require('node-static'),
    file = new static.Server('./output');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(8080);