// ==UserScript==
// @name         Copy buttons
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a copy button to the strings on Artemis
// @author       Nanook
// @match        https://artemis.ase.in.tum.de/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tum.de
// ==/UserScript==

let observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      let ttElements = document.querySelectorAll('tt');

      ttElements.forEach(ttElement => {
        if (!ttElement.querySelector('button')) {
          let button = document.createElement('button');
          button.textContent = '🗎';
          button.style.border = 'none';
          button.style.background = 'transparent';
          button.style.position = 'relative';
          button.style.top = '+3px';
          ttElement.appendChild(button);

          button.addEventListener('click', () => {
              let textToCopy = ttElement.textContent.replace(/⎵/g, ' ');
              let lastIndex = textToCopy.lastIndexOf('🗎');
              if (lastIndex !== -1) {
                  textToCopy = textToCopy.slice(0, lastIndex) + textToCopy.slice(lastIndex + '🗎'.length);
              }
              navigator.clipboard.writeText('"' + textToCopy + '"')
                  .then(() => {})
                  .catch(err => {
                  console.error('Failed to copy text: ', err);
              });
          });
        }
      });
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });
