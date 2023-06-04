document.addEventListener("DOMContentLoaded", init);

let screen;
let time;
let noteId = 0;
let note = notes[0];
const duration = 120;
let timeRemaining = duration;

function init(){
    const urlParams = new URLSearchParams(window.location.search);
    screen = document.querySelector("#screen");
    showNote();
    document.querySelectorAll("#submit div p").forEach(e => e.addEventListener('click', nextNote));
}

function nextNote(){
    noteId++;
    if(noteId > notes.length -1){
        window.location.href = "test.html";
    }
    showNote();
}

function showNote(){
    let btn = document.querySelector(`[data-note="${note.name}"]`);
    btn.style.backgroundColor = "";
    note = getNote();
    playNote(note);
    btn = document.querySelector(`[data-note="${note.name}"]`);
    btn.style.backgroundColor = "green";
    screen.innerHTML =  `<img alt="" src="/assets/images/${note.img}.png"></img>`;
}

function getNote(){
    console.log(notes[noteId]);
    return notes[noteId];
}

function playNote(note){
    const audio = new Audio(`/assets/audio/${note.audio}.mp3`);
    audio.play();
}