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
 * Debug package.
 */
NYSI.namespace("log");

NYSI.log = function(){
	// flag to turn on/off debugging
	var DEBUG = true;  
	
	//disable debugging by overiding the default console function
	if(!DEBUG && console){
		console.log = function(){};
	}

	function sprintf(strTpl, jsonData){
		if(!!jsonData){
			return Mustache.to_html(strTpl, jsonData);
		}
		else{
			return strTpl;
		}
	};

	return {
		modal:function(strTpl, jsonData){
			if(DEBUG){
				alert(sprintf(strTpl, jsonData));
			}
		},	

		console:function(strTpl, jsonData){
			if(DEBUG){
				console.log(sprintf(strTpl, jsonData));
			}
		}
	};
}();


/**
 * base package.
 */
NYSI.namespace("base");

NYSI.base.timed = function(fn, callback) {
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

NYSI.base.bootstrap = function(dependencies, callback){
	var resources=[];
	var jsDependencies = dependencies.js;
	for (var i=0, l=jsDependencies.length; i<l; i++) {
		if(!jsDependencies[i].test){
			resources.push(jsDependencies[i].path);
		}
	}
	if(resources.length > 1){
		Modernizr.load({
		  load: resources,
		  complete : function (){
		  	callback();
		  }
		});
	}
}


/**
 * Framework package.
 */
NYSI.namespace("framework");

NYSI.framework.app = function(){
	var that = {};

	that.initModern = function(){};
	that.initLegacy = function(){};
	that.init = function(){};

	that.startModern = function(){
	  NYSI.log.console('init starts for modern(HTML5)!');
		NYSI.base.timed(that.initModern);
	  NYSI.log.console('init completes for modern(HTML5)!');
	}
	
	that.startLegacy = function(){
	  NYSI.log.console('init starts for legacy(Polyfill)!');
		NYSI.base.timed(that.initLegacy);
	  NYSI.log.console('init completes for legacy(Polyfill)!');
	}
	
	that.start = function(){
	  NYSI.log.console('init starts for app!');
		NYSI.base.timed(that.init);
	  NYSI.log.console('init completes for app!');
	}

	return that;
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

