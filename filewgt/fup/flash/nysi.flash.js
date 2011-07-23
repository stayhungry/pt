/**
* Place to organize flash related code
* @author yitao.guan
*/

NYSI.namespace("flash.filemgr");

NYSI.flash.filemgr.bootstrap = function(){
  $('#file_upload').uploadify({
    'uploader'  : '/pt/filewgt/fup/flash/uploadify.swf',
    'script'    : pathToUpload,
    'cancelImg' : '/pt/filewgt/fup/flash/cancel.png',
    'folder'    : '../upfiles',
    'buttonText': 'UPLOAD FILES',
    'auto'      : false,
    'multi'     : true,
    'removeCompleted' : false,
    'scriptAccess' : 'always',
    'onSelect': function(){
    	$('#btn_upload').show(); 
    	$('#btn_reset').show();
    }
  });
};
	

NYSI.flash.filemgr.reset = function(){
	$('#file_upload').uploadifyClearQueue();
	$('#btn_upload').hide(); 
	$('#btn_reset').hide();
};
	
