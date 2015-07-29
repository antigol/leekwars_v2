// ==UserScript==
// @name          [Leek Wars] Notifications Remover
// @namespace     https://github.com/jogalaxy/leekwars_v2
// @version       0.6
// @description   Permet de supprimer la bulle des notifications
// @author        Rominou & jojo123 & Keorl
// @projectPage   https://github.com/jogalaxy/leekwars_v2
// @updateURL     https://github.com/jogalaxy/leekwars_v2/raw/master/leekwars_notifications_remover.user.js
// @downloadURL   https://github.com/jogalaxy/leekwars_v2/raw/master/leekwars_notifications_remover.user.js
// @match         http://leekwars.com/*
// @grant         none
// ==/UserScript==

(function()
{

	$('head').append('<style>#notifications .label { cursor: pointer }</style>');

	$("body").on("click", "#notifications .label", function()
	{
		_.post("notification/read-all", {});
		LW.notifications.unread = 0;
		LW.updateCounters();
	});


	var init_interval = setInterval(function()
	{
		if (LW.socket.socket !== null && $('.notifications-counter').length)
		{
			LW.socket.socket.onmessage_back_notifications_remover = LW.socket.socket.onmessage;
			LW.socket.socket.onmessage = function(msg)
			{
				this.onmessage_back_notifications_remover(msg);
			}
			
			clearInterval(init_interval);
		}
	}, 100);

})();
