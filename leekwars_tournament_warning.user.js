// ==UserScript==
// @name          [Leek Wars] Editor - Tournament warning
// @namespace     https://github.com/antigol/leekwars_v2
// @version       0.2
// @description   Ajoute un warning
// @author        Chabrogar
// @projectPage   https://github.com/antigol/leekwars_v2
// @downloadURL   https://github.com/antigol/leekwars_v2/raw/master/leekwars_tournament_warning.user.js
// @updateURL     https://github.com/antigol/leekwars_v2/raw/master/leekwars_tournament_warning.user.js
// @match         http://leekwars.com/*
// @grant         none
// ==/UserScript==

(function()
{

function warn() {
	var d = new Date();
	var hour = d.getHours(); // fonctionne uniquement dans le même fuseau horraire que la france.
	var minutes = d.getMinutes();
	var seconds = d.getSeconds();
	
	if ((hour >= 11 && hour < 14) || (hour >= 17 && hour < 20) || (hour >= 20 && hour < 23)) {
        if ((minutes >= 25 && minutes <= 31) || (minutes >= 55 || minutes <= 1)) {
            $('.tournament_warning').css('background-color', 'red');
        } else {
            $('.tournament_warning').css('background-color', 'orange');
        }
        
        $('.tournament_warning').html('Warning ! it is '+d.toLocaleTimeString());
	}
}

var interval = 0;

LW.on('pageload', function() {
	if (LW.currentPage == 'editor') {
        $('<div class="tournament_warning" style="background-color:red; color:black; padding:5px; style="font-weight:bold";"></div>').insertAfter('#editor-page .page-header');
		interval = setInterval(warn, 1000);
	} else {
		clearInterval(interval);
	}
});

})();
