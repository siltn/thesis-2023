document.addEventListener("DOMContentLoaded", init);

let email = localStorage.getItem('email');
let group = localStorage.getItem('group');
let style = localStorage.getItem('style');
let firstTest = localStorage.getItem('firstTest');

if(email == null || group == null){
    window.location.href = "login.html";
}
else if(style == null && group == 3){
    alert("Je moet nog de leerstijl test doen. \n (Zorg dat je geluid aan staat)");
    window.location.href = "../knn/test.html";
}
else if(firstTest == null){
    alert("Je moet nog de initialisatie test doen.");
    window.location.href = "test.html";
}

function init(){
    if(group == 3 && style == "audio"){
        document.querySelector("#volume").classList.remove("hidden");
    }
}

socket.onopen = function(event){
    console.log(group);
    console.log(style);
    if(group == 3 && style != null){
        socket.send(JSON.stringify({"type": "setStyle", "email": email, "style": style}));
    }
}