/**
 * Generates a namespace from passed String. This need to be the 1st section of the code
 * @author yitao.guan
 * @param {String} namespace Namespace to be generated
 * @sample:  
 *   NYSI.namespace("enterprise");
 *   NYSI.enterprise.showBranding = function(){..};
 */

var NYSI = NYSI || {};
NYSI.namespace = function() {
	var a = arguments, o = null, i, j, d;
	var l = a.length;
	for(i = 0; i < l; i++) {
		d = ('' + a[i]).split('.');
		o = NYSI;
		for(j = (d[0] == 'NYSI') ? 1 : 0; j < d.length; j++) {
			o[d[j]] = o[d[j]] || {};
			o = o[d[j]];
		}
	}
	return o;
};


/**
 * log package.
 */
NYSI.namespace("log");

NYSI.log = function(){
	// flag to turn on/off debugging
	var DEBUG = true;  
	var LEVEL = "DEBUG";
	
	//disable debugging by overiding the default console function
	if(!DEBUG && console){
		console.log = function(){};
	}

	function sprintf(strTpl, jsonData){
		var outTpl = LEVEL + ": " + strTpl;
		if(!!jsonData){
			return Mustache.to_html(outTpl, jsonData);
		}
		else{
			return outTpl;
		}
	};

	return {
		modal:function(strTpl, jsonData){
			if(DEBUG){
				alert(sprintf(strTpl, jsonData));
			}
		},	

		console:function(strTpl, jsonData){
			if(DEBUG && console){
				console.log(sprintf(strTpl, jsonData));
			}
		}
	};
}();


/**
 * debug package.
 */
NYSI.namespace("debug");

NYSI.debug.timed = function(fn, callback) {
	var start = (new Date()).getTime(), result, diff;
	result = fn.apply(this, arguments);
	diff = (new Date()).getTime() - start;
	if (NYSI.util.isFnExist(callback)) {
	  callback(diff);
	} else {
		NYSI.log.console("Function {{funcName}} finished in {{execTime}} millseconds", {"funcName": NYSI.util.getFnName(fn), "execTime":diff});
	}
	return result;
};


/**
 * framework package.
 */
NYSI.namespace("framework");

NYSI.framework.createApp = function(){
	var that = {};

	that.initModern = function(){};
	that.initLegacy = function(){};
	that.init = function(){};

	that.startModern = function(){
	  NYSI.log.console('init starts for modern(HTML5)!');
		NYSI.debug.timed(that.initModern);
	  NYSI.log.console('init completes for modern(HTML5)!');
	}
	
	that.startLegacy = function(){
	  NYSI.log.console('init starts for legacy(Polyfill)!');
		NYSI.debug.timed(that.initLegacy);
	  NYSI.log.console('init completes for legacy(Polyfill)!');
	}
	
	that.start = function(){
	  NYSI.log.console('init starts for app!');
		NYSI.debug.timed(that.init);
	  NYSI.log.console('init completes for app!');
	}

	return that;
}

NYSI.framework.bootstrap = function(dependencies, app){
  NYSI.log.console('calculating dependencies ...');
	var resources=[];
	var jsDependencies = dependencies.js;
	for (var i=0, l=jsDependencies.length; i<l; i++) {
		var loaded = jsDependencies[i].test;
		var resource = jsDependencies[i].path;
		if(!loaded){
			resources.push(resource);
			NYSI.log.console('Dependency is queued for {{resource}}', {"resource": resource});
		} else {
			NYSI.log.console('Dependency already loaded for {{resource}}', {"resource": resource});
		}
	}
	var numOfResources = resources.length;
	NYSI.log.console('Total dependencies to load: {{count}}', {"count": numOfResources});
	if(numOfResources > 0){
	NYSI.log.console('loading');
		Modernizr.load({
		  load: resources,
		  complete : function (){
				NYSI.log.console('All dependencies are loaded and app starts.');
		  	app.start();
		  }
		});
	}
}













/**
NYSI.base.loadScript = function(src) {
  var head = document.getElementsByTagName("head")[0];
  var newScript = document.createElement('script');
  newScript.type = 'text/javascript';
  newScript.src = src;
  head.appendChild(newScript);
};


NYSI.base.loadScript = function(src) {
	document.write('<script type="text/javascript" src="' + src + '"></script>');
};

*/

