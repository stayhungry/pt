/**
* Place to organize html5 related code
* @author yitao.guan
*/

NYSI.namespace("html5.filemgr");

NYSI.html5.filemgr.bootstrap = function(){

	var filesToUpload = [];
	
  function uploadFile(file, id) {

    /* upload file along with arbitary data that is not in the form */
    var fd = new FormData();
    fd.append("author", "yitao");
    fd.append("name", "Html 5 File API/FormData");
    fd.append("Filedata", file);

    var xhr = new XMLHttpRequest();        
    xhr.upload.addEventListener("progress", function(evt){uploadProgress(evt, id)}, false);
    xhr.addEventListener("load", function(evt){uploadComplete(evt, id)}, false);
    xhr.addEventListener("error", function(evt){uploadFailed(evt, id)}, false);
    xhr.addEventListener("abort", function(evt){uploadCanceled(evt, id)}, false);
    xhr.open("POST", pathToUpload);

    xhr.send(fd);
  }

  function uploadProgress(evt, id) {
    var progressBar = $('#progress-bar-' + id);
    if (evt.lengthComputable) {
      var percentComplete = Math.round(evt.loaded * 100 / evt.total);
    	NYSI.log.console("file[{{id}}] upload in progress {{pct}}%.", {"id": id, "pct": percentComplete});	
			progressBar.css('width', percentComplete + "%");
    }
    else {
      progressBar.html('unable to compute');
    }  
  }

  function uploadComplete(evt, id) {
    var progressBar = $('#progress-bar-' + id);
		progressBar.css('width', "100%");
    NYSI.log.console("file[{{id}}] upload complete with {{pct}}%.", {"id": id, "pct": "100"});
    filesToUpload[id].uploaded = true;
    var uploadResponse = $('#upload-response-' + id);
    uploadResponse.html(evt.target.responseText);
  }  

  function uploadFailed(evt, id) {
    var uploadResponse = $('#upload-response-' + id);
    uploadResponse.html("An error occurred while uploading the file.");
  }  

  function uploadCanceled(evt, id) {
    var uploadResponse = $('#upload-response-' + id);
    uploadResponse.html("The upload has been canceled by the user or the browser dropped the connection.");
  }  
  
  function secondsToString(seconds) {        
    var h = Math.floor(seconds / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 3600 % 60);
    return ((h > 0 ? h + ":" : "") + (m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "0:") + (s < 10 ? "0" : "") + s);
  }

  function humanlizeFileSize(size) {        
	  var fileSize = 0;
    if (size >= 1024 * 1024){
      fileSize = (Math.round(size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
    }
    else{
      fileSize = (Math.round(size * 100 / 1024) / 100).toString() + 'KB';
    }
    return fileSize;
  }


	return {
		reset: function(){
			filesToUpload.length = 0;	
			$('#file-list').empty(); 
			$('#btn-upload').hide(); 
			$('#btn-reset').hide();
		},

		showFiles: function(){
			var files = $('#file-to-upload')[0].files;
			if (typeof files !== "undefined") {
				var filesToShow = [];
				var base = filesToUpload.length;
				for (var i=0, l=files.length; i<l; i++) {
					var fileInfo = {
						"fileId": base + i, 
						"fileName": files[i].name, 
						"fileSize": humanlizeFileSize(files[i].size), 
						"fileType": files[i].type, 
						"file": files[i], 
						"uploaded": false
					};
					filesToShow.push(fileInfo);
					filesToUpload.push(fileInfo);
				}
				var data= {"files": filesToShow};
				var html=Mustache.to_html($('#tpl-file-list').html(), data);
				$(html).appendTo('#file-list');
			} else {
				$('#file-list').html("No support for the File API in this web browser");
			}	
		},

		uploadFiles: function(){
			for (var i=0, l=filesToUpload.length; i<l; i++) {
				var fileInfo = filesToUpload[i]
				if(!fileInfo.uploaded){
					uploadFile(fileInfo.file, fileInfo.fileId);
				}
			}
		}
	};		
};

	