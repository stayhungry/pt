<?php

  $file_id='file';
  $status='';

  $filename=$_FILES[$file_id]['name'];
  $tmpfile=$_FILES[$file_id]['tmp_name'];

  if(!$filename) {
    	echo returnStatus("No file specified");
    	return;
  }

  if(move_uploaded_file($tmpfile, "upfiles\\".$filename)){
    $status='Success';
  }else{
    $status='Failed';
  }
  
  echo returnStatus($status);

	function returnStatus($status){
		return "
    <html><body>
    <script>
        parent.rpc.returnUploadResponse({
            status: '".$status."',
            msg: 'The upload is ".$status."!'
        });
    </script>
    </body></html>
    ";
	}

?>
