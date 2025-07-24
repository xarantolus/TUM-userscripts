// ==UserScript==
// @name        Fix Semester Selection on TUM Moodle
// @namespace   xarantolus
// @match       https://www.moodle.tum.de/my/
// @grant       none
// @version     1.0
// @author      xarantolus
// @description Sets the semester selection to current semester
// ==/UserScript==

var interval = null;
function selectTop() {
	var elem = document.getElementById("coc-filterterm");
	if (!elem) return;
	if (!elem.options || elem.options.length < 2) return;

	let fixed = false;
	for (let i = 0; i < elem.options.length; i++) {
		const option = elem.options[i];
		if (option.value !== "all" && option.value.trim() !== "") {
			elem.selectedIndex = i;
			// Trigger change event to ensure the selection is processed
			elem.dispatchEvent(new Event('change', { bubbles: true }));
			fixed = true;
			break;
		}
	}

	if (fixed) {
		clearInterval(interval);
	}
}

function fixSelection() {
	interval = setInterval(selectTop, 200);
}

window.addEventListener('load', fixSelection);
