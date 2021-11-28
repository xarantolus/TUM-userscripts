// ==UserScript==
// @name        Moodle Panopto Content
// @namespace   Violentmonkey Scripts
// @match       https://www.moodle.tum.de/course/view.php
// @grant       none
// @version     1.1
// @author      -
// @description When opening a moodle course that has Panopto content, automatically click the "show more" button
// ==/UserScript==

function panoptoReverseSort() {
    var pc = document.getElementById("block_panopto_content");

    var lectureElements = [...pc.querySelectorAll(".listItem")].filter(x => getComputedStyle(x).display !== "none");

    // the first item is always hidden
    var hiddenElement = pc.querySelector(".listItem");

    // This implicitly also reverses the list, which is great
    lectureElements.forEach(x => {
        hiddenElement.after(x);
    });

    // Move the section header to the top, too
    hiddenElement.after(document.querySelector(".sectionHeader"))

    document.querySelector("#showAllDiv").remove();
}

function clickShowPanoptoMore() {
    var targetNode = document.querySelector("[data-block=panopto]");
    if (!targetNode) {
        return;
    }

    const config = {
        attributes: true,
        childList: true,
        subtree: true
    };

    const callback = function (mutationsList, observer) {
        var showMore = document.getElementById("showAllToggle");

        if (showMore && showMore.innerText.indexOf("Alles") !== -1) {
            showMore.click();
            
            // For some lectures it might make sense to  
            panoptoReverseSort();

            observer.disconnect();
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
}

// Basically move the "users online" tile to the bottom of the sidebar. I really don't care
function moveUsersOnlineTile() {
    var uo = document.querySelector(".block_online_users");
    if (uo) {
        uo.parentElement.lastChild.after(uo);
    }
}

moveUsersOnlineTile();
clickShowPanoptoMore();
