document.addEventListener("DOMContentLoaded", init);

let right;
let wrong;

function init(){
    const urlParams = new URLSearchParams(window.location.search);
    right = urlParams.get('right') || 0;
    wrong = urlParams.get('wrong') || 0;

    document.querySelector("#info").innerHTML = `<p>${right} noten juist</p><p>${wrong} noten fout</p>`;
}