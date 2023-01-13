// ==UserScript==
// @name         UU Endre størrelse på fonter. og linjeavstand
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  For å sjekke om teksten går så mye utenfor oppgitte rammer at den ikke blir tilgjengelig.
// @author       Terje Rudi
// @match        https://*.hvl.no/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hvl.no
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Elementer i sida som skal endres med knottene.
    let targetsList = 'h1, h2, h3, h4, p, time, th, td, ul, li a, label, input, select, .link--footer, .button--footer, .header__english, .button--chat, summary';

    function enlargeFont(){
        let targets = document.querySelectorAll(targetsList);
        targets.forEach((e) => {
            let style = window.getComputedStyle(e, null).getPropertyValue('font-size');
            let currentFontSize = parseFloat(style);
            let newFontSize = Math.ceil(currentFontSize * 1.1);
            // Test: e.style.border = 'solid 3px red';
            e.style.fontSize = newFontSize + 'px';
        })
    }

    function increaseParagraphBottom(){
        let targets = document.querySelectorAll('p');
        targets.forEach((e) => {
            let style = window.getComputedStyle(e, null).getPropertyValue('margin-bottom');
            let currentMargin = parseFloat(style);
            let newMargin = Math.ceil(currentMargin * 1.1);
            // Test: e.style.border = 'solid 3px red';
            e.style.marginBottom = newMargin + 'px';
        })
    }

    function enlargeLineHeight(){
        let targets = document.querySelectorAll(targetsList);
        targets.forEach((e) => {
            let style = window.getComputedStyle(e, null).getPropertyValue('line-height');
            let currentLineHeight = parseFloat(style);
            let newLineHeight = Math.ceil(currentLineHeight * 1.1);
            // Test: e.style.border = 'solid 3px red';
            e.style.lineHeight = newLineHeight + 'px';
        })
    }

    function increaseSpacing(){
        let targets = document.querySelectorAll(targetsList);
        targets.forEach((e) => {
            let style = window.getComputedStyle(e, null).getPropertyValue('letter-spacing');
            let currentLetterSpacing = parseFloat(style);
            let newLetterSpacing = Math.ceil(currentLetterSpacing * 1.1);
            // Test: e.style.border = 'solid 3px red';
            e.style.letterSpacing = newLetterSpacing + 'px';
        })
    }

    function createBtn(label){
        let btn = document.createElement('button');
         btn.style.width = '100%';
        btn.style.fontStyle = 'bold';
        btn.style.background = 'yellow';
        btn.style.padding = '1rem';
        btn.style.borderRadius = '.4rem';
        btn.style.border = 'solid .2rem #004357';
        btn.style.boxShadow = '.1rem .1rem .2rem rgba(0,0,0,.3)';
        btn.style.marginBottom = '.3rem';
        btn.innerText = label;
        btn.style.cursor = 'pointer';
        return btn;
    }

    // R U N

    let panel = document.createElement('div');
    panel.style.position = 'fixed';
    panel.style.width = 'clamp(12rem,100%,20rem)';
    panel.style.left = '1rem';
    panel.style.bottom = '2rem';
    panel.style.fontSize = '2rem';
    panel.style.zIndex = '10000';


    // Fontforstørrelsesknapp
    let enlargeBtn = createBtn('Forstørr font');
    enlargeBtn.addEventListener('click',function(){
        enlargeFont();
    });
    panel.appendChild(enlargeBtn);

    // linjehøydeøkningsknapp
    let increaseLineHeight = createBtn('Øk linjeavstand');
    increaseLineHeight.addEventListener('click',function(){
        enlargeLineHeight();
    });
    panel.appendChild(increaseLineHeight);

    // Økning av mellomrom mellom bokstaver
    let increaseLetterSpacing = createBtn('Øk spacing');
    increaseLetterSpacing.addEventListener('click',function(){
        increaseSpacing();
    });
    panel.appendChild(increaseLetterSpacing);

    // Økning av etter avsnitt
    let increaseParEnd = createBtn('Øk avsnittsbunn');
    increaseParEnd.addEventListener('click',function(){
        increaseParagraphBottom();
    });
    panel.appendChild(increaseParEnd);

    document.body.appendChild(panel);
})();