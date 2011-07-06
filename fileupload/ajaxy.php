<?php

  $file_id='file';
  $status='';

  $filename=$_FILES[$file_id]['name'];
  $tmpfile=$_FILES[$file_id]['tmp_name'];

  if(!$filename) {
    	echo returnStatus("No file specified");
    	return;
  }
  /*copy file over to tmp directory */
  if(move_uploaded_file($tmpfile, "upfiles\\".$filename)){
    $status='Success';
  }else{
    $status='Failed';
  }
  echo returnStatus($status);

	function returnStatus($status){
		return "
			<html><body>
			<script type='text/javascript'>
				function init(){
					if(top.uploadComplete) top.uploadComplete('".$status."');
					}
				window.onload=init;
			</script>
			</body></html>";
	}

?>
