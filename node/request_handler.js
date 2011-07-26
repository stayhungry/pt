var url = require("url");

// api for introspecting server methods
function index(req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write("upload: form post of file(s)");
  res.end();
}

// api for uploading files
function upload(req, res) {
  
}

// api for incorrect calls etc.
function unknown(req, res) {
  res.writeHead(404, {"Content-Type": "text/plain"});
  res.write("unknown api called: "+ url.parse(req.url).pathname);
  res.end();
}

exports.index = index;
exports.upload = upload;
exports.unknown = unknown;
