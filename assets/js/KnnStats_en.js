document.addEventListener("DOMContentLoaded", init);

let right;
let wrong;
let next;
let group;

function init(){
    const urlParams = new URLSearchParams(window.location.search);
    right = urlParams.get('right') || 0;
    wrong = urlParams.get('wrong') || 0;
    next = urlParams.get('next') || 1;
    group = localStorage.getItem('group');

    document.querySelector("#info").innerHTML = `<p>${right} notes right</p><p>${wrong} notes wrong</p>`;

    if(next < 6){
        document.querySelector("#next").href = `test.html?type=${next}`;
    }
    else{
        if(group == 0){
            document.querySelector("#next").href = `../index.html`;
            document.querySelector("#next").innerHTML = `home`;
            document.querySelector("#thanks").innerHTML = `Dankjewel om mee te doen aan de test!`;
        }
        else{
            document.querySelector("#next").href = `../learning_en/index.html`;
            document.querySelector("#next").innerHTML = `home`;
            document.querySelector("#thanks").innerHTML = `Found your learnstyle.`;
        }
    }
}