// ==UserScript==
// @name            TUM-Moodle automatic login redirect
// @version         1
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

        var loginNode = [...document.querySelectorAll(".card-title.d-inline")].find(n => n.innerText == "Moodle Login");
        if (!loginNode) {
            // Probably already logged in
            return;
        }

        var loginList = loginNode.nextElementSibling;

        var loginLink = [...loginList.querySelectorAll("a")].find(x => x.innerText.indexOf("TUM") !== -1);
        if (!loginLink) {
            return;
        }
    } else if (window.location.pathname === "/login/index.php" || window.location.pathname === "/login/") {
        // If you are presented with the "Your session has timed out. Please log in again." message
        var loginLink = document.querySelector("a[title='TUM LOGIN']")
    }

    if (loginLink) {
        loginLink.click();
    }
}


redirectToLogin();
