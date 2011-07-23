$(function(){  


module("Base Test");  

test("NYSI.debug.timed", function() {  

  function namedFunction(){return 'runned'};
  equals(
   	NYSI.debug.timed(namedFunction), 
   	"runned" 
  ); 	

  function echo(str){return str};
  equals(
   	NYSI.debug.timed(namedFunction, echo), 
   	"runned" 
  ); 	

}); 




});  