var http = require("http");
var url = require("url");

// listen to port, handle requests function array
function start(port, handle) {

  http.createServer(function(request, response) {

    var path = url.parse(request.url).pathname;
    console.log("request for pathname: "+path+" recieved");

    if ( typeof handle[path] === 'function' ) handle[path](request,response);
    else handle["/404"](request,response);

  }).listen(port);

  console.log("starting server at port: "+port);
}

exports.start = start;
