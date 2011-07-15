/**
* Place to organize flash related code
* @author yitao.guan
*/

NYSI.namespace("flash.filemgr");

NYSI.flash.filemgr.bootstrap = function(){
  $('#file_upload').uploadify({
    'uploader'  : 'uploadify/uploadify.swf',
    'script'    : pathToUpload,
    'cancelImg' : 'uploadify/cancel.png',
    'folder'    : 'upfiles',
    'auto'      : false,
    'multi'     : true,
    'scriptAccess' : 'always'
  });
};
	

