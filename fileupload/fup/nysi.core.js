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

NYSI.util.isFuncExist = function(func){
	return (typeof func === 'function');
}
	
NYSI.util.loadCDNLocal = function(jsonData){
	if(!!jsonData){
		Modernizr.load([
			{
			  load: jsonData.cdnUrl,
			  callback: function(url, result, key){
			    if (window.jQuery) {
				    NYSI.log.console('loading from Google API succeeded,  app starts. ');
				    if(NYSI.util.isFuncExist(jsonData.callback)){
				    	jsonData.callback();
				    }
			    }
			    else{
			    	NYSI.log.console('loading from Google API failed,  loading from our server instead');
			      Modernizr.load({
			      	load: jsonData.localUrl,
						  callback: function(url, result, key){
						    if (window.jQuery) {
							    NYSI.log.console('loading from our server succeeded,  app starts. ');
							    if(NYSI.util.isFuncExist(jsonData.callback)){
							    	jsonData.callback();
							    }
						    }
						    else{
							    alert('Please refresh the page. ');
						    }
						  }
						})
			    }
			  }
			}
		]);		
	}
};

NYSI.util.loadAppRes = function(jsonData){
	Modernizr.load({
	  test: jsonData.test,
	  yep: jsonData.modern.resources,
	  nope: jsonData.legacy.resources,
	  callback: function (url, result, key){
	    if (url === jsonData.modern.resources[jsonData.modern.resources.length - 1]) {
	      NYSI.log.console('using modern(HTML5)!');
		    if(NYSI.util.isFuncExist(jsonData.modern.callback)){
		    	jsonData.modern.callback();
		    }
	    }
	    else if (url === jsonData.legacy.resources[jsonData.legacy.resources.length - 1]){
	      NYSI.log.console('using legacy(Polyfill)!');
		    if(NYSI.util.isFuncExist(jsonData.legacy.callback)){
		    	jsonData.legacy.callback();
		    }
	    }
	  }
	});
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
	
	return {
		modal:function(strTpl, jsonData){
			if(DEBUG){
				alert(NYSI.util.sprintf(strTpl, jsonData));
			}
		},	

		console:function(strTpl, jsonData){
			if(DEBUG){
				console.log(NYSI.util.sprintf(strTpl, jsonData));
			}
		}
	};
}();


