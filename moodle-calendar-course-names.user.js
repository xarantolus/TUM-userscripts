// ==UserScript==
// @name        Moodle Show Calendar Course Info
// @match       https://www.moodle.tum.de/my/
// @grant       none
// @version     1.0
// @namespace   xarantolus
// @author      xarantolus
// @description Show course names in the "current deadlines" view on the start page of Moodle
// ==/UserScript==

function getCourseID(courseURL) {
  let params = new URLSearchParams((new URL(courseURL)).search);

  return params.get("course") || params.get("id");
}

function annotateCalendarEvents() {
  let courseInfo = [...document.querySelectorAll("a[href*=course\\/view\\.php\\?id]")];
  let calendarEvents = [...document.querySelectorAll("a[href*=calendar\\/view\\.php]")].filter(e => e.href.includes("course="));

    for (let evt of calendarEvents) {
      let courseID = getCourseID(evt.href);
      let courseTitle = courseInfo.find(x => x.title && x.href.endsWith(courseID))?.title?.trim()
      if (!courseTitle) continue;

      // Yep, injections could be possible, but I don't care
      evt.insertAdjacentHTML("beforebegin", "<strong>" + courseTitle + "</strong><br>");
    }

  console.log(courseInfo);
}


annotateCalendarEvents();
