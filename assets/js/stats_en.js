document.addEventListener("DOMContentLoaded", init);

let right;
let wrong;

function init(){
    const urlParams = new URLSearchParams(window.location.search);
    right = urlParams.get('right') || 0;
    wrong = urlParams.get('wrong') || 0;

    document.querySelector("#info").innerHTML = `<p>${right} notes correct</p><p>${wrong} notes wrong</p>`;
}