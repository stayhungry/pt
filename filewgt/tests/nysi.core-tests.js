$(function(){  

module("Utils Test");  

test("NYSI.util.sprintf", function() {  

  equals(
   	NYSI.util.sprintf("My first name is {{fname}} and last name is {{lname}}.", {'fname': 'John', 'lname': 'Doe'} ), 
   	"My first name is John and last name is Doe." 
  ); 	

  equals(
   	NYSI.util.sprintf("My name is John Doe."), 
   	"My name is John Doe." 
  ); 	

});  

test("NYSI.util.getFnName", function() {  

  function namedFunction(){};
  equals(
   	NYSI.util.getFnName(namedFunction), 
   	"namedFunction" 
  ); 	

  var anonymousFunction = function(){};
  equals(
   	NYSI.util.getFnName(anonymousFunction), 
   	"" 
  ); 	

});  

test("NYSI.util.timed", function() {  

  function namedFunction(){return 'runned'};
  equals(
   	NYSI.util.timed(namedFunction), 
   	"runned" 
  ); 	

  function echo(str){return str};
  equals(
   	NYSI.util.timed(namedFunction, echo), 
   	"runned" 
  ); 	

}); 
});  