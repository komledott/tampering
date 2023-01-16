// ==UserScript==
// @name         UU Endre størrelse på fonter. og linjeavstand
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  For å sjekke om teksten går så mye utenfor oppgitte rammer at den ikke blir tilgjengelig.
// @author       Terje Rudi
// @match        https://*.hvl.no/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hvl.no
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Elementer i sida som skal endres med knottene.
    const targetsList = 'h1, h2, h3, h4, p, time, th, td, ul, li a, label, input, select, .link--footer, .button--footer, .header__english, .button--chat, summary';
    const factors = {
        fontSize : 1.5,
        letterSpacing : .12,
        wordSpacing : .16,
        lineHeight : 1.5,
        paragraphBottom : 2
    }

    function enlargeFont(){
        let targets = document.querySelectorAll(targetsList);
        targets.forEach((e) => {
            let style = window.getComputedStyle(e, null).getPropertyValue('font-size');
            let currentFontSize = parseFloat(style);
            let newFontSize = Math.ceil(currentFontSize * factors.fontSize);
            // Test: e.style.border = 'solid 3px red';
            e.style.fontSize = newFontSize + 'px';
        })
    }

    function increaseParagraphBottom(){
        let targets = document.querySelectorAll('p');
        targets.forEach((e) => {
            let style = window.getComputedStyle(e, null).getPropertyValue('font-size');
            let currentFontSize = parseFloat(style);
            let newMargin = Math.ceil(currentFontSize * factors.paragraphBottom);
            // Test: e.style.border = 'solid 3px red';
            e.style.marginBottom = newMargin + 'px';
        })
    }

    function enlargeLineHeight(){
        let targets = document.querySelectorAll(targetsList);
        targets.forEach((e) => {
            let style = window.getComputedStyle(e, null).getPropertyValue('font-size');
            let currentFontSize = parseFloat(style);
            let newLineHeight = Math.ceil(currentFontSize * factors.lineHeight);
            // Test: e.style.border = 'solid 3px red';
            e.style.lineHeight = newLineHeight + 'px';
        })
    }

    function increaseSpacing(){
        let targets = document.querySelectorAll(targetsList);
        targets.forEach((e) => {
            let style = window.getComputedStyle(e, null).getPropertyValue('font-size');
            let currentFontSize = parseFloat(style);
            let newLetterSpacing = Math.ceil(currentFontSize * factors.letterSpacing);
            // Test: e.style.border = 'solid 3px red';
            e.style.letterSpacing = newLetterSpacing + 'px';
        })
    }

    function increaseWordSpacing(){
        let targets = document.querySelectorAll(targetsList);
        targets.forEach((e) => {
            let style = window.getComputedStyle(e, null).getPropertyValue('font-size');
            let currentFontSize = parseFloat(style);
            let newWordSpacing = Math.ceil(currentFontSize * factors.wordSpacing);
            // Test: e.style.border = 'solid 3px red';
            e.style.wordSpacing = newWordSpacing + 'px';
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
        btn.innerHTML = label;
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
    let enlargeBtn = createBtn('Font <sub><big>*</big></sub> ' + factors.fontSize);
    enlargeBtn.addEventListener('click',function(){
        enlargeFont();
        this.outerHTML = '';
    });
    panel.appendChild(enlargeBtn);

    // linjehøydeøkningsknapp
    let increaseLineHeight = createBtn('Linjeavstand (fontstr. <sub><big>*</big></sub> ' + factors.lineHeight + ')');
    increaseLineHeight.addEventListener('click',function(){
        enlargeLineHeight();
        this.outerHTML = '';
    });
    panel.appendChild(increaseLineHeight);

    // Økning av mellomrom mellom bokstaver
    let increaseLetterSpacing = createBtn('Spacing <sub><big>*</big></sub> ' + factors.letterSpacing);
    increaseLetterSpacing.addEventListener('click',function(){
        increaseSpacing();
        this.outerHTML = '';
    });
    panel.appendChild(increaseLetterSpacing);

    // Økning av mellomrom mellom ord
    let increaseWordSpace = createBtn('Ordspacing <sub><big>*</big></sub> ' + factors.wordSpacing);
    increaseWordSpace.addEventListener('click',function(){
        increaseWordSpacing();
        this.outerHTML = '';
    });
    panel.appendChild(increaseWordSpace);

    // Økning av etter avsnitt
    let increaseParEnd = createBtn('Avsnittsbunn (fontstr. <sub><big>*</big></sub> ' + factors.paragraphBottom + ')');
    increaseParEnd.addEventListener('click',function(){
        increaseParagraphBottom();
        this.outerHTML = '';
    });
    panel.appendChild(increaseParEnd);

    document.body.appendChild(panel);
})();
