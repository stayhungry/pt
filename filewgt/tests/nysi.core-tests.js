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

test("NYSI.util.isFnExist", function() {  
	var fn1;
  var fn2= function (){};
  //ok(!NYSI.util.isFnExist(fn0));
  ok(!NYSI.util.isFnExist(fn1));
  ok(NYSI.util.isFnExist(fn2));

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




module("CDN loading Test");  
yepnope.errorTimeout = 500; 

test("NYSI.util.loadCDNLocal", function() {
	stop(1000);
	expect(1);
	
	NYSI.util.loadCDNLocal({
		'cdnUrl': 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js', 
		'localUrl': 'blah',
		'test': 'window.jQuery',
		'callback': function(){
			ok(window.jQuery, "jQuery has loaded from CDN");
			start();
		}
	});

});

test("NYSI.util.loadCDNLocal", function() {
	stop(1000);
	expect(1);

	NYSI.util.loadCDNLocal({
		'cdnUrl': 'blah', 
		'localUrl': '../fup/jquery-1.6.2.min.js',
		'test': 'window.jQuery',
		'callback': function(){
			ok(window.jQuery, "jQuery has loaded from local");
			start();
		}
	});

});





});  