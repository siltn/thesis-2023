document.addEventListener("DOMContentLoaded", init);

function init(){
    document.querySelectorAll("button").forEach(btn => {btn.addEventListener("click", saveStyle)});
}

function saveStyle(e){
    localStorage.setItem("style", e.target.dataset.style);
    localStorage.setItem("group", 0);
    window.location.href = "../knn/test.html";
}