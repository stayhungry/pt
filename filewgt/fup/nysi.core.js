/**
 * Generates a namespace from passed String. This need to be the 1st section of the code
 * @author yitao.guan
 * @param {String} namespace Namespace to be generated
 * @sample:  
 *   NYSI.namespace("enterprise");
 *   NYSI.enterprise.showBranding = function(){..};
 */


NYSI.namespace("core");




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

NYSI.util.timed = function(fn, callback) {
	var start = (new Date()).getTime(), result, diff;
	result = fn.apply(this, arguments);
	diff = (new Date()).getTime() - start;
	if (NYSI.util.isFnExist(callback)) {
	  callback(diff);
	} else {
		NYSI.log.console("Function {{funcName}} finished in {{execTime}} millseconds", {'funcName': NYSI.util.getFnName(fn), 'execTime':diff});
	}
	return result;
};


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




/**
 * Framework package.
 */
NYSI.namespace("framework");

NYSI.framework.jQueryBootStrap = function(app){
	NYSI.util.loadCDNLocal({
		'cdnUrl': 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js', 
		'localUrl': 'fup/jquery-1.6.2.min.js',
		'test': 'window.jQuery',
		'callback': app.start
	});
}

NYSI.framework.app = function(){
	var that = {};

	that.initModern = function(){};
	that.initLegacy = function(){};
	that.init = function(){};

	that.startModern = function(){
	  NYSI.log.console('init starts for modern(HTML5)!');
		NYSI.util.timed(that.initModern);
	  NYSI.log.console('init completes for modern(HTML5)!');
	}
	
	that.startLegacy = function(){
	  NYSI.log.console('init starts for legacy(Polyfill)!');
		NYSI.util.timed(that.initLegacy);
	  NYSI.log.console('init completes for legacy(Polyfill)!');
	}
	
	that.start = function(){
	  NYSI.log.console('init starts for app!');
		NYSI.util.timed(that.init);
	  NYSI.log.console('init completes for app!');
	}

	return that;
}