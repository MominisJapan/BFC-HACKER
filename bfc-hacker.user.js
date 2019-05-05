// ==UserScript==
// @name             BFC-HACKER
// @namespace        https://github.com/mominisjapan
// @version          5
// @description      best-friends.chatのハッカー絵文字を簡単に入力
// @author           Mominis
// @match            https://best-friends.chat/*
// @grant            none
// @run-at           document-end
// ==/UserScript==
const version = "5";
window.onload = () => {
    console.log(`BFC-HACKER ${version}\nBy Mominis(mn@best-friends.chat)`);
    const elm = document.createElement('button');
    elm.innerHTML = `HACKER!`;
    elm.style = `background-color:#000000;color:#FFFFFF;font-weight:bolder;font-style:italic;width:100%;font-size:200%;`;
    elm.onclick = `toHacker(document.getElementsByClassName('autosuggest-textarea__textarea')[0].innerText)`;
    document.getElementsByClassName('compose-form')[0].appendChild(elm);
    elm.addEventListener('click',hacking);
}
const hacking = () => {
    let textarea = document.getElementsByClassName('autosuggest-textarea__textarea')[0]
    textarea.value = sift(textarea.innerHTML).join('');
}

let needsSpaceBefore = false;
let isBetweenSemicolon = false;
const sift = (str) => {
    needsSpaceBefore = false;
    let hack = [];
    for(let i=0;i!=str.length;i++){
        const charC = str.codePointAt(i);
        if(charC==0x3b){
            //semicolon
            console.log(`BFC-HACKER:No.${i} is semicolon`);
            if(isBetweenSemicolon){
                hack[i] = `${space()}`;
                needsSpaceBefore = false;
                isBetweenSemicolon = false;
            }else{
                hack[i] = ``;
                needsSpaceBefore = true;
                isBetweenSemicolon = true;
            }
        }else if(isBetweenSemicolon){
            console.log(`BFC-HACKER:No.${i}(${charC}) is between semicolons`);
            hack[i] = str[i];
        }else if(charC >= 0x61 && charC <= 0x7a){
            //latin small, "abcdefghijklmnopqrstuvwxyz"
            console.log(`BFC-HACKER:No.${i} is LATIN SMALL LETTER a~z`);
            needsSpaceBefore = true
            hack[i] = `${space()}:hacker_${str[i]}:`;
        }else if(charC == 0x20){
            //space, " " => ideographic space, "　" (全角スペース)
            console.log(`BFC-HACKER:No.${i} is SPACE`);
            needsSpaceBefore = false;
            hack[i] = `　`;
        }else{
            //semicolon,latin small,spaceのどれでもない
            console.log(`BFC-HACKER:No.${i} is other charactor`);
            needsSpaceBefore = true;
            hack[i] = `${space()}${str[i]}`;
        }
    }
    return hack;
};

const space = () => {
    if(needsSpaceBefore){
        return `\u200b`;//ZERO WIDTH SPACE
    }else{
        return ``;
    }
}