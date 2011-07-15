/**
* Place to organize html5 related code
* @author yitao.guan
*/

NYSI.namespace("html5.filemgr");

NYSI.html5.filemgr.bootstrap = function(){

  var bytesUploaded = 0;
  var bytesTotal = 0;
  var previousBytesLoaded = 0;
  var intervalTimer = 0;

  function uploadFile(file) {
    previousBytesLoaded = 0;
    $('#upload-response').css('display', 'none');
    $('#progress-number').html('');
    var progressBar = $('#progress-bar');
    progressBar.css('display', 'block');
    progressBar.css('width', '0px');        

    /* upload file along with arbitary data that is not in the form */
    var fd = new FormData();
    fd.append("author", "yitao");
    fd.append("name", "Html 5 File API/FormData");
    fd.append("Filedata", file);

    var xhr = new XMLHttpRequest();        
    xhr.upload.addEventListener("progress", uploadProgress, false);
    xhr.addEventListener("load", uploadComplete, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.addEventListener("abort", uploadCanceled, false);
    xhr.open("POST", pathToUpload);

    xhr.send(fd);
    intervalTimer = setInterval(updateTransferSpeed, 500);
  }

  function updateTransferSpeed() {
    var currentBytes = bytesUploaded;
    var bytesDiff = currentBytes - previousBytesLoaded;
    if (bytesDiff == 0) return;
    previousBytesLoaded = currentBytes;
    bytesDiff = bytesDiff * 2;
    var bytesRemaining = bytesTotal - previousBytesLoaded;
    var secondsRemaining = bytesRemaining / bytesDiff;
    var speed = "";
    if (bytesDiff > 1024 * 1024)
      speed = (Math.round(bytesDiff * 100/(1024*1024))/100).toString() + 'MBps';
    else if (bytesDiff > 1024)
      speed =  (Math.round(bytesDiff * 100/1024)/100).toString() + 'KBps';
    else
      speed = bytesDiff.toString() + 'Bps';
    $('#transfer-speed-info').html(speed);
    $('#time-remaining-info').html('| ' + secondsToString(secondsRemaining));        
  }

  function uploadProgress(evt) {
    if (evt.lengthComputable) {
      bytesUploaded = evt.loaded;
      bytesTotal = evt.total;
      var percentComplete = Math.round(evt.loaded * 100 / evt.total);
      var bytesTransfered = '';
      if (bytesUploaded > 1024*1024)
        bytesTransfered = (Math.round(bytesUploaded * 100/(1024*1024))/100).toString() + 'MB';
      else if (bytesUploaded > 1024)
        bytesTransfered = (Math.round(bytesUploaded * 100/1024)/100).toString() + 'KB';
      else
        bytesTransfered = (Math.round(bytesUploaded * 100)/100).toString() + 'Bytes';
      $('#progress-number').html(percentComplete.toString() + '%');
      $('#progress-bar').css('width', (percentComplete * 3.55).toString() + 'px');
      $('#transfer-bytes-info').html(bytesTransfered);
      if (percentComplete == 100) {
        document.getElementById('progress-info').css('none');
        var uploadResponse = $('#upload-response');
        uploadResponse.html('<span style="font-size: 18pt; font-weight: bold;">Please wait...</span>');
        uploadResponse.css('display', 'block');
      }
    }
    else {
      $('#progress-bar').html('unable to compute');
    }  
  }

  function uploadComplete(evt) {
    clearInterval(intervalTimer);
    var uploadResponse = $('#upload-response');
    uploadResponse.html(evt.target.responseText);
    uploadResponse.css('display', 'block');
  }  

  function uploadFailed(evt) {
    clearInterval(intervalTimer);
    alert("An error occurred while uploading the file.");  
  }  

  function uploadCanceled(evt) {
    clearInterval(intervalTimer);
    alert("The upload has been canceled by the user or the browser dropped the connection.");  
  }  
  
  function secondsToString(seconds) {        
    var h = Math.floor(seconds / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 3600 % 60);
    return ((h > 0 ? h + ":" : "") + (m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "0:") + (s < 10 ? "0" : "") + s);
  }

	return {

		fileSelected: function(){
	    var file = $('#file-to-upload')[0].files[0]; 
	    var fileSize = 0;
	    if (file.size > 1024 * 1024){
	      fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
	    }
	    else{
	      fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
	    }
	    $('#file-info').css('display', 'block');
	    $('#file-name').html('Name: ' + file.name);
	    $('#file-size').html('Size: ' + fileSize);
	    $('#file-type').html('Type: ' + file.type);
		},
		
		uploadFiles: function(){
			var files = $('#file-to-upload')[0].files;
			if (typeof files !== "undefined") {
				for (var i=0, l=files.length; i<l; i++) {
					uploadFile(files[i]);
				}
			}
			else {
				$('#fup-info').html("No support for the File API in this web browser");
			}	
		}
	};		
};
