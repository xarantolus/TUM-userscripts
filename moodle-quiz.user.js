// ==UserScript==
// @name        Quiz redirect
// @namespace   Violentmonkey Scripts
// @match       https://www.moodle.tum.de/mod/quiz/review.php
// @match       https://www.moodle.tum.de/mod/page/view.php
// @grant none
// @version     1.0
// @author      -
// @description 11/16/2020, 3:41:06 PM
// ==/UserScript==


// If quiz buttons are there, we register them and save the last page
function registerQuiz() {
    function clickQuizButton() {
        localStorage.setItem("userscript_quiz_page_before", location.href);
    }
    var quizButtons = [...document.querySelectorAll("button")].filter(x => x.innerText.indexOf("Quiz") !== -1);
    quizButtons.forEach(function (button) {
        button.addEventListener('click', clickQuizButton);
    })
}

// If the quiz is done, we might be able to add a link back to the page
function addBackLink() {
    var link = localStorage.getItem("userscript_quiz_page_before");
    if (!link) {
        return;
    }

    var block = document.getElementById("mod_quiz_navblock");
    if (!block) {
        return;
    }

    var nav = block.querySelector(".othernav");
    if (!nav) {
        return;
    }

    var backLink = document.createElement("a");
    backLink.innerText = "Zurück zur Vorlesung";
    backLink.className = "mod_quiz-next-nav";
    backLink.href = link;
    nav.appendChild(backLink);
}

registerQuiz();
addBackLink();
