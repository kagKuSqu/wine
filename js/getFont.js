document.body.style.height=window.innerHeight+'px';
function recalc() {
	var clientWidth = document.documentElement.clientWidth;
	if(!clientWidth) return;
	document.documentElement.style.fontSize = 40 * (clientWidth / 320) + 'px';
}

function initRecalc() {
	recalc();
	var resizeEvt = 'osrientationchange' in window ? 'orientationchange' : 'resize';
	if(!document.addEventListener) return;
	window.addEventListener(resizeEvt, recalc, false);
	document.addEventListener('DOMContentLoaded', recalc, false);
}
initRecalc();