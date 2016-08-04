
n() {
    'use strict';

    /* A user script rendition of a Javascriptlet scroller*
      based on:
      The Autoscroll Bookmarket:Tim Harper:http://tim.theenchanter.com*/
var _ss_interval_pointer="notstarted";
var _ss_speed = 6;
var running=false;
    var _ss_abs_speed,_ss_direction ,_ss_speed_pair;
var _ss_speed_pairs = [
	[0, 0],
	[1, 200.0],
	[1, 120.0],
	[1, 72.0],
	[1, 43.2],
	[1, 25.9],
	[2, 31.0],
	[4, 37.2],
	[8, 44.8],
	[8, 26.4],
	[16, 32.0]
];
var _ss_last_onkeypress = document.onkeypress;
var _ss_stop = function() {
	clearTimeout(_ss_interval_pointer);
    running=false;
    setCookie("running", "false", 365);
};
var _ss_start = function() {
    if (_ss_interval_pointer!="notstarted") clearTimeout(_ss_interval_pointer);
    setCookie("running", "true", 365);
    console.log("start");running=true;
	 _ss_abs_speed = Math.abs(_ss_speed);
	 _ss_direction = _ss_speed / _ss_abs_speed;
	 _ss_speed_pair = _ss_speed_pairs[_ss_abs_speed];
    
	_ss_interval_pointer = setInterval(function () {
        scrollBy(0,_ss_direction * _ss_speed_pair[0]); 
        if((pageYOffset<=1)||(pageYOffset==document.height-innerHeight)) _ss_speed=0;
      }, _ss_speed_pair[1]);
};
var _ss_adj = function(q) {
	_ss_speed = q;
	if (Math.abs(_ss_speed) >= _ss_speed_pairs.length) _ss_speed = (_ss_speed_pairs.length - 1) * (_ss_speed / Math.abs(_ss_speed));
};
var _ss_quit = function() {
	_ss_stop();
	//document.onkeypress = _ss_last_onkeypress;
};
document.onkeypress = function(e) {
	console.log(e.charCode);

	console.dir(e);

	if ((e.charCode == 113) || (e.keyCode == 27) || (e.keyCode == 48)) {
		_ss_quit();
		return;
	};
    	if ((e.charCode == 223) ) {
		_ss_start();
            
		return;
	};
	if (e.charCode >= 49 && e.charCode <= 57) _ss_speed = e.charCode - 48;
	else switch (e.charCode) {
	case 95:
		_ss_adj(-2);
	case 45:
		_ss_adj(-1);
		break;
	case 43:
		_ss_adj(2);
	case 61:
		_ss_adj(1);
		break;
	};
    if (running){
        
	    _ss_stop();
	    _ss_start();
    }
};
//_ss_stop();
if (getCookie("running")=="true") _ss_start();
    console.log("cookie "+getCookie("running"));
        function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
    
})();
