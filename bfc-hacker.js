// ==UserScript==
// @name         BFC-HACKER
// @name:en      BFC-HACKER
// @namespace    https://github.com/mominisjapan
// @version      0.1
// @description  bestfriendsのハッカー絵文字を簡単に入力しよう
// @description:en a tool to toot "Hacker Emoji" easier for best-friends.chat
// @author       Mominis
// @match        https://best-friends.chat/*
// @grant        none
// ==/UserScript==

const nanka = (str,i) => {
    if(str.codePointAt(0) >= 97 && str.codePointAt(0) <= 122){
        console.log('small latin'+i);
        return `:hacker_${str}: `;
    }else{
        console.log('not small latin'+i);
        return str;
    }
};
const toHacker = () => {
    const tar = document.getElementsByClassName('autosuggest-textarea__textarea')[0],
          str = tar.innerHTML.toLowerCase();
    let ret = [];
    for(let i=0;i!=str.length;i++){
        ret[i] = nanka(str[i],i);
    }
    console.log(str);
    tar.value = ret.join('');
};
    console.log('NewUser');
    const elm = document.createElement('button');
    elm.innerHTML = `HACKER!`;
    elm.style = `background-color:#000000;color:#FFFFFF;font-weight:bolder;font-style:italic;width:100%;font-size:200%;`;
    elm.onclick = `toHacker(document.getElementsByClassName('autosuggest-textarea__textarea')[0].innerText)`;
    document.getElementsByClassName('compose-form')[0].appendChild(elm);
elm.addEventListener('click',toHacker);
