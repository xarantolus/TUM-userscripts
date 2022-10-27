// ==UserScript==
// @name            TUM-Moodle automatic login redirect
// @version         1.2
// @namespace       xarantolus
// @author          xarantolus
// @grant           none
// @match           https://www.moodle.tum.de/
// @match           https://www.moodle.tum.de/login/index.php
// @match           https://www.moodle.tum.de/login/
// @description     Automatically redirects from certain moodle sites if not logged in, which saves you one click.
// ==/UserScript==

function redirectToLogin() {
    var loginLink = [
      ...document.querySelectorAll("a.icon-arrow-right"),
      ...document.querySelectorAll("a.btn"),
    ].find(x => x.innerText.indexOf("TUM") !== -1);

    if (loginLink) {
        loginLink.click();
    }
}

redirectToLogin();
