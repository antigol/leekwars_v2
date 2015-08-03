// ==UserScript==
// @name          [Leek Wars] Editor - Tournament Warning
// @namespace     https://github.com/antigol/leekwars_v2
// @version       0.3
// @description   Ajoute un warning dans l'éditeur si un match de tournois démarre dans pas longtemps
// @author        Chabrogar
// @projectPage   https://github.com/antigol/leekwars_v2
// @downloadURL   https://github.com/antigol/leekwars_v2/raw/master/leekwars_tournament_warning.user.js
// @updateURL     https://github.com/antigol/leekwars_v2/raw/master/leekwars_tournament_warning.user.js
// @match         http://leekwars.com/*
// @grant         none
// ==/UserScript==

(function()
{
    var critical_times = [[12,0], [12,30], [13,0], [13,30], [14,0], [18,0], [18,30], [19,0], [19,30], [20,0], [21,0], [21,30], [22,0], [22,30], [23,0]];

    function warn() {
        // fonctionne uniquement dans le même fuseau horraire que la france.
        var d = new Date();
        var hour = d.getHours();
        var minutes = d.getMinutes();
        var seconds = d.getSeconds();
        
        var offset = -1;
        for (var i = 0; i < critical_times.length; ++i) {
            var x = 60 * (critical_times[i][0] - hour) + critical_times[i][1] - minutes;
            if (x >= 0) {
                offset = x;
                break;
            }
        }
        
        if (offset >= 0) {
            if (offset <= 5) $('.tournament_warning').css('background-color', 'red');
            else $('.tournament_warning').css('background-color', 'orange');

            $('.tournament_warning').show();
            $('.tournament_warning').html('Warning ! it is '+d.toLocaleTimeString()+' next tournament\'s match in '+offset+' minutes');
        } else {
            $('.tournament_warning').hide();
        }
    }

    var interval = 0;

    LW.on('pageload', function() {
        if (LW.currentPage == 'editor') {
            $('<div class="tournament_warning"></div>').insertAfter('#editor-page .page-header');
            $('.tournament_warning').css('font-weight', 'bold');
            $('.tournament_warning').css('padding', '3px');
            interval = setInterval(warn, 1000);
        } else {
            clearInterval(interval);
        }
    });

})();
