// ==UserScript==
// @name          [Leek Wars] Editor - Download alls ais
// @namespace     https://github.com/antigol/leekwars_v2
// @version       0.1
// @description   
// @author        Chabrogar
// @projectPage   https://github.com/antigol/leekwars_v2
// @downloadURL   https://github.com/antigol/leekwars_v2/raw/master/leekwars_download_all_ais.user.js
// @updateURL     https://github.com/antigol/leekwars_v2/raw/master/leekwars_download_all_ais.user.js
// @match         http://leekwars.com/*
// @grant         none
// ==/UserScript==

(function() {
	_init = false;
	
	LW.on('pageload', function() {
		if (!_init) {
			_init = true;
			var head = document.getElementsByTagName('head')[0];
			if (!head) { return; }
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = 'https://raw.githubusercontent.com/Stuk/jszip/master/dist/jszip.min.js';
			script.onload = function() {
				_.toast('JSZip loaded');
			};
			head.appendChild(script);
		}
		
		if (LW.currentPage == 'editor')
		{
			$('#editor-page .tabs').prepend('<div id="download-all-button" class="tab" title="">Download all</div>');
			$('#download-all-button').click(download_all_function);
		}
	});
	
	function download_all_function() {
		var zip = new JSZip();
		zip.file("Hello.txt", "Hello World\n");
		var img = zip.folder("images");
		img.file("smile.gif", imgData, {base64: true});
		var content = zip.generate({type:"blob"});
		// see FileSaver.js
		saveAs(content, "example.zip");
	}
})();
