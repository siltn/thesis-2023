document.addEventListener("DOMContentLoaded", init);

let email = localStorage.getItem('email');
let group = localStorage.getItem('group');
let style = localStorage.getItem('style');
let firstTest = localStorage.getItem('firstTest');

if(email == null || group == null){
    window.location.href = "login.html";
}
else if(style == null && group == 3){
    alert("You still have to do the learn style test \n (Make sure your volume is turned on)");
    window.location.href = "../knn_en/test.html";
}
else if(firstTest == null){
    alert("You still have to do the initalisation test.");
    window.location.href = "test.html";
}

function init(){
    if(group == 3 && style == "audio"){
        document.querySelector("#volume").classList.remove("hidden");
    }
}

socket.onopen = function(event){

    if(group == 3 && style != null){
        socket.send(JSON.stringify({"type": "setStyle", "email": email, "style": style}));
    }
}