<?php

class File_Streamer
{
	private $fileName;
	private $contentLength;
	private $destination;
	
	public function __construct(){
		if (!isset($_SERVER['HTTP_X_FILE_NAME']) 
			|| !isset($_SERVER['CONTENT_LENGTH'])) {
			throw new Exception("No headers found!");
		}
		
		$this->fileName = $_SERVER['HTTP_X_FILE_NAME'];
		$this->contentLength = $_SERVER['CONTENT_LENGTH'];
	}
    
	public function isValid(){
	    if (($this->contentLength > 0)) {
	        return true;
	    }
	    return false;
	}
    
  public function setDestination($destination){
  	$this->destination = $destination;
  }
    
  public function receive(){
    if (!$this->isValid()) {
    	throw new Exception('No file uploaded!');
    }

    $fileReader = fopen('php://input', "r");  
    $fileWriter = fopen($this->destination . $this->fileName, "w+");  
    while(true) {  
      $buffer = fgets($fileReader, 4096);  
      if (strlen($buffer) == 0) {  
          fclose($fileReader);  
          fclose($fileWriter);  
          return true;  
      }  
      fwrite($fileWriter, $buffer);  
    }  
    return false;  

/*	
      file_put_contents(
      	$this->destination . $this->fileName, 
      	file_get_contents("php://input")
      );
     
      return true;
*/
  }
}

$ft = new File_Streamer();  
$ft->setDestination('upfiles/');  
if ($ft->receive()){
	echo "success";
}else{
	echo "failure";
}


?>
