// ==UserScript==
// @name          [Leek Wars] Editor - Tournament warning
// @namespace     https://github.com/antigol/leekwars_v2
// @version       0.1
// @description   Ajoute un warning
// @author        Chabrogar
// @projectPage   https://github.com/antigol/leekwars_v2
// @downloadURL   https://github.com/antigol/leekwars_v2/raw/master/leekwars_tournament_warning.user.js
// @updateURL     https://github.com/antigol/leekwars_v2/raw/master/leekwars_tournament_warning.user.js
// @match         http://leekwars.com/*
// @grant         none
// ==/UserScript==

LW.on('pageload', function()
{
	if (LW.currentPage == 'editor')
	{
		var d = new Date();
		var hour = d.getUTCHours() + 1;
		var minutes = d.getUTCMinutes();
		
		if ((hour >= 11 && hour < 14) || (hour >= 17 && hour < 20) || (hour >= 20 && hour < 23)) {
			$('<div style="background-color:red; color:black; padding:5px; style="font-weight:bold";">Warning !</div>').insertAfter('#editor-page .page-header');
		}
	}
});

