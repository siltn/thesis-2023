document.addEventListener("DOMContentLoaded", init);

let preloader;

function init(){
    preloader = document.querySelector("#preload");
    notes.forEach(note => {
        loadNote(note);
    });
}

function loadNote(note){
    preloader.innerHTML += `<link rel="preload" href="/assets/images/${note.img}.png" as="image"></link>`;
    preloader.innerHTML += `<link rel="preload" href="/assets/images/color/${note.img}.png" as="image"></link>`;
}