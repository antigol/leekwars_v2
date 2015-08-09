// ==UserScript==
// @name          [Leek Wars] Editor - Download alls ais
// @namespace     https://github.com/antigol/leekwars_v2
// @version       1
// @description   
// @author        Chabrogar
// @projectPage   https://github.com/antigol/leekwars_v2
// @downloadURL   https://github.com/antigol/leekwars_v2/raw/master/leekwars_download_all_ais.user.js
// @updateURL     https://github.com/antigol/leekwars_v2/raw/master/leekwars_download_all_ais.user.js
// @match         http://leekwars.com/*
// @grant         none
// @require       https://raw.githubusercontent.com/eligrey/FileSaver.js/master/FileSaver.min.js
// @require       https://raw.githubusercontent.com/Stuk/jszip/master/dist/jszip.min.js
// ==/UserScript==

(function() {
	LW.on('pageload', function() {
		if (LW.currentPage == 'editor')
		{
			$('#editor-page .tabs').prepend('<div id="download-all-button" class="tab" title="">Download all</div>');
			$('#download-all-button').click(download_all_function);
		}
	});
	
	function download_all_function() {
		_.post('ai/get-farmer-ais', {}, function(x) {
			if (!x.success) { return; }
			
			// see JSZip
			var zip = new JSZip();
			var counter = 0;
			
			for (var i = 0; i < x.ais.length; ++i) {
				_.post('ai/get', {ai_id : x.ais[i].id}, function(y) {
					if (!y.success) { return; }
					zip.file(y.ai.name+'.js', y.ai.code);
					counter++;
					
					_.toast(''+counter+'/'+x.ais.length+' '+y.ai.name+' added to the zip file');
					
					if (counter == x.ais.length) {
						var content = zip.generate({type:"blob"});
						// see FileSaver.js
						saveAs(content, ''+LW.farmer.name+'.zip');
					}
				});
			}
		});
	}
})();
