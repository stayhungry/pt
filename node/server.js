var http = require("http"),
    url = require("url");

// listen to port, handle requests function array
function start(port, handle, handle_unknown) {

  http.createServer(function(request, response) {

    var path = url.parse(request.url).pathname;
    console.log("request for pathname: "+path+" recieved");

    if ( typeof handle[path] === 'function' ) handle[path](request,response);
    else handle_unknown(request,response);

  }).listen(port);

  console.log("starting server at port: "+port);
}

exports.start = start;
