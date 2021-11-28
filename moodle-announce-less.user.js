// ==UserScript==
// @name        Moodle Announce Less
// @match       https://www.moodle.tum.de/course/view.php
// @grant       none
// @version     1.1
// @namespace   xarantolus
// @author      xarantolus
// @description When opening a moodle course, make sure the page isn't cluttered with news
// ==/UserScript==

function lessAnnouncements() {
    var announcements = document.querySelector(".block_news_items");
    if (!announcements) return;

    var list = announcements.querySelector("ul");
    if (!list || list.children.length < 4) return;


    while (list.children.length > 3)
        list.children[list.children.length - 1].remove();
}


lessAnnouncements();
