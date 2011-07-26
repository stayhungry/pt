var server = require("./server.js"),
    request_handler = require("./request_handler.js");

////////////////////////////////////////////
// dependency injections properties start

var listening_port = 8888;

var handle = {};

// all handlers share the doc root
handle.doc_root = "content"; 
// here is where we store any uploaded, modified files
handle.file_save_path = "content/uploaded_files"; 
// this is where the web upload form posts
handle.form_action = "/upload"; 

handle["/"] = request_handler.index;
handle["/index"] = request_handler.index;
handle["/upload"] = request_handler.upload;

handle["/set_upload"] = request_handler.set_upload;

handle["/404"] = request_handler.unknown;

// dependency injections properties stop
////////////////////////////////////////////

// main event loop
server.start(listening_port, handle, handle["/404"]);

