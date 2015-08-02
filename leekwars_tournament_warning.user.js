// ==UserScript==
// @name          [Leek Wars] Editor - Tournament warning
// @namespace     https://github.com/antigol/leekwars_v2
// @version       0.1
// @description   Ajoute un warning
// @author        Chabrogar
// @projectPage   https://github.com/antigol/leekwars_v2
// @downloadURL   https://github.com/antigol/leekwars_v2/raw/master/leekwars_editor_import_export.user.js
// @updateURL     https://github.com/antigol/leekwars_v2/raw/master/leekwars_editor_import_export.user.js
// @match         http://leekwars.com/*
// @grant         none
// ==/UserScript==

LW.on('pageload', function()
{
	if (LW.currentPage == 'editor')
	{
		$('#editor-page .tabs').prepend('Warning !');
	}
});

