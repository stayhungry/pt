<?php

  $file_id='fileToUpload';
  $status='';

  $filename=$_FILES[$file_id]['name'];
  $tmpfile=$_FILES[$file_id]['tmp_name'];

  if(!$filename) {
    	echo "No file specified";
    	return;
  }
  /*copy file over to tmp directory */
  if(move_uploaded_file($tmpfile, "upfiles\\".$filename)){
    $status='Success';
  }else{
    $status='Failed';
  }
  echo $status;

?>
