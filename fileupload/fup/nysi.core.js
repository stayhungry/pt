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
 * Other core functionalities should follow below using the NYSI.namespace.
 */

DEBUG = true; // set to false to disable debugging
old_console_log = console.log;
console.log = function() {
  if(DEBUG) {
  	old_console_log.apply(this, arguments);
  }
}