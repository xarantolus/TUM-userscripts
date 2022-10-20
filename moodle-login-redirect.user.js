// ==UserScript==
// @name            TUM-Moodle automatic login redirect
// @version         1.1
// @namespace       xarantolus
// @author          xarantolus
// @grant           none
// @match           https://www.moodle.tum.de/
// @match           https://www.moodle.tum.de/login/index.php
// @match           https://www.moodle.tum.de/login/
// @description     Automatically redirects from certain moodle sites if not logged in, which saves you one click.
// ==/UserScript==

function redirectToLogin() {
    if (window.location.pathname === "/") {
        // When visiting the main page, so one doesn't have to click on the link manually
        // This searches the link from the menu on the right

        var loginNode = document.getElementById("loginlinks");
        if (!loginNode) {
            // Probably already logged in
            return;
        }

        var loginLink = [...loginNode.querySelectorAll("a.btn")].find(x => x.innerText.indexOf("TUM") !== -1);
        if (!loginLink) {
            return;
        }
    }

    if (loginLink) {
        loginLink.click();
    }
}


redirectToLogin();
