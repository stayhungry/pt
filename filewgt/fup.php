<?php

  $file_id='Filedata';
  $status='';

  $filename=$_FILES[$file_id]['name'];
  $tmpfile=$_FILES[$file_id]['tmp_name'];

  if(!$filename) {
    	echo "No file specified";
    	return;
  }
  /*copy file over to tmp directory */
  if(move_uploaded_file($tmpfile, "../upfiles/".$filename)){
    $status='Success';
  }else{
    $status='Failed';
  }
  //header('HTTP/1.1 201 created');
  echo $status;

?>
