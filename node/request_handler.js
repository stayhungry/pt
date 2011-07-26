var url = require("url"),
    fs = require("fs"),
    formidable = require("formidable");

// api for introspecting server methods
function index(req, res) {
  console.log("upload path: "+this.doc_root);
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write('<a href="/upload">upload</a>: form post of file(s)<br/>');
  res.write('<a href="/set_upload">set_upload</a>: sets up a html form for uploading file from browser');
  res.end();
}

// api for setting up uploading of files
// needs 'form_action' information to be injected
function set_upload(req, res) {
  console.log("form_action: "+this.form_action);
  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="' + this.form_action + '" enctype="multipart/form-data" method="post">'+
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
// needs 'file_save_path' information to be injected
function upload(req, res) {
  console.log("Inside Request handler 'upload'");

  var form = new formidable.IncomingForm();
  var dir = this.file_save_path;

  console.log("about to parse");
  form.parse(req, function(error, fields, files) {
    console.log("parsing done, "+ files.upload.path + " saved to: " + dir);
    fs.renameSync(files.upload.path, dir + "/test.png");
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
