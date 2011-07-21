/**
* Place to organize flash related code
* @author yitao.guan
*/

NYSI.namespace("flash.filemgr");

NYSI.flash.filemgr.bootstrap = function(){
  $('#file_upload').uploadify({
    'uploader'  : 'fup/flash/uploadify.swf',
    'script'    : pathToUpload,
    'cancelImg' : 'fup/flash/cancel.png',
    'folder'    : '../upfiles',
    'buttonText': 'UPLOAD FILES',
    'auto'      : false,
    'multi'     : true,
    'removeCompleted' : false,
    'scriptAccess' : 'always',
    'onSelect': function(){$('#btn_upload').show();}
  });
};
	

