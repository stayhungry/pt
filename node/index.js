var server = require("./server.js");
var request_handler = require("./request_handler.js");

// dependency injections start

var listening_port = 8888;

var handle = {};
handle["/"] = request_handler.index;
handle["/index"] = request_handler.index;
handle["/upload"] = request_handler.upload;
handle["/set_upload"] = request_handler.set_upload;
handle["/404"] = request_handler.unknown;

// dependency injections stop

// main event loop
server.start(listening_port, handle, handle["/404"]);

