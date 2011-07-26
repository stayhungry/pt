var url = require("url"),
    fs = require("fs"),
    formidable = require("formidable");

// api for introspecting server methods
function index(req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write("upload: form post of file(s)\n");
  res.write("set_upload: sets up a html form for uploading file from browser");
  res.end();
}

// api for setting up uploading of files
// needs 'action' information to be injected
function set_upload(req, res) {
  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(body);
  res.end();
}

// api for uploading files
// needs 'path' information to be injected
function upload(req, res) {
  console.log("Inside Request handler 'upload'");

  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(req, function(error, fields, files) {
    console.log("parsing done");
    fs.renameSync(files.upload.path, "/tmp/test.png");
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("received image:<br/>");
    res.end();
  });
}

// api for incorrect calls etc.
function unknown(req, res) {
  res.writeHead(404, {"Content-Type": "text/plain"});
  res.write("unknown api called: "+ url.parse(req.url).pathname);
  res.end();
}

exports.index = index;
exports.upload = upload;
exports.set_upload = set_upload;
exports.unknown = unknown;
