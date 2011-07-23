/**
 * Util package.
 */
NYSI.namespace("util");

NYSI.util.sprintf = function(strTpl, jsonData){
	if(!!jsonData){
		return Mustache.to_html(strTpl, jsonData);
	}
	else{
		return strTpl;
	}
};

NYSI.util.isFnExist = function(fn){
	return fn && (typeof fn === 'function');
}

NYSI.util.getFnName = function(fn) {
	return fn.name ? fn.name : "";
}

NYSI.util.loadDependencies = function(callback){
	Modernizr.load({
	  test: window.jQuery,
	  nope: ['fup/jquery-1.6.2.min.js'],
	  complete : function (){
	  	callback();
	  }
	});
}

NYSI.util.loadCDNLocal = function(jsonData){
	if(!!jsonData){
		Modernizr.load([
			{
			  load: jsonData.cdnUrl,
			  callback: function(url, result, key){
			    if (eval(jsonData.test)) {
				    NYSI.log.console('loading from CDN succeeded,  app starts. ');
				    if(NYSI.util.isFnExist(jsonData.callback)){
				    	jsonData.callback();
				    }
			    }
			    else{
			    	NYSI.log.console('loading from CDN failed,  loading from our server instead');
			      Modernizr.load({
			      	load: jsonData.localUrl,
						  callback: function(url, result, key){
						    if (eval(jsonData.test)) {
							    NYSI.log.console('loading from our server succeeded,  app starts. ');
							    if(NYSI.util.isFnExist(jsonData.callback)){
							    	jsonData.callback();
							    }
						    }
						    else{
							    NYSI.log.modal('Please refresh the page. ');
						    }
						  }
						})
			    }
			  }
			}
		]);		
	}
};

NYSI.util.loadAppRes = function(app, jsonData){
	Modernizr.load({
	  test: jsonData.test,
	  yep: jsonData.modern.resources,
	  nope: jsonData.legacy.resources,
	  callback: function (url, result, key){
	    if (url === jsonData.modern.resources[jsonData.modern.resources.length - 1]) {
		    if(NYSI.util.isFnExist(jsonData.modern.callback)){
		    	jsonData.modern.callback();
		    }
		    else{
		    	app.startModern();
		    }
	    }
	    else if (url === jsonData.legacy.resources[jsonData.legacy.resources.length - 1]){
		    if(NYSI.util.isFnExist(jsonData.legacy.callback)){
		    	jsonData.legacy.callback();
		    }
		    else{
		    	app.startLegacy();
		    }
	    }
	  }
	});
};

NYSI.util.jQueryBootStrap = function(app){
	NYSI.util.loadCDNLocal({
		'cdnUrl': 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js', 
		'localUrl': 'fup/jquery-1.6.2.min.js',
		'test': 'window.jQuery',
		'callback': app.start
	});
}



NYSI.util.createQueue = function(){

  var queue  = [];
  var offset = 0;

	var that = {};
	
  that.getLength = function(){
    return (queue.length - offset);
  }

  that.isEmpty = function(){
    return (queue.length == 0);
  }

  that.enqueue = function(item){
    queue.push(item);
  }

  that.dequeue = function(){
    if (queue.length == 0) return undefined;
    var item = queue[offset];
    // increment the offset and remove the free space if necessary
    if (++ offset * 2 >= queue.length){
      queue  = queue.slice(offset);
      offset = 0;
    }
    return item;
  }

  that.peek = function(){
    return (queue.length > 0 ? queue[offset] : undefined);
  }

	return that;
}