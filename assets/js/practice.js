document.addEventListener("DOMContentLoaded", init);

let group;
let email;
let style;
let screen;
let time;
let stats = {
    right: 0,
    wrong: 0
};
let lastTen = {
    right: 0,
    wrong: 0
};
let level;
let note;
const duration = 240;
let timeRemaining = duration;
let lastTime = duration;

const timerInterval = setInterval(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    
    // Display the time remaining in the specified element
    const timerElement = document.querySelector("#time");
    timerElement.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    // Decrement the time remaining
    timeRemaining--;
    
    // If the timer has ended, redirect to the specified URL
    if (timeRemaining < 0) {
      clearInterval(timerInterval);
      const data = {"type": "practice", "email": email};
      socket.send(JSON.stringify(data));
      window.location.href = `stats.html?right=${stats.right}&wrong=${stats.wrong}`;
    }
  }, 1000);

function init(){
    email = localStorage.getItem('email');
    const urlParams = new URLSearchParams(window.location.search);
    group = localStorage.getItem('group');
    style = localStorage.getItem('style');
    screen = document.querySelector("#screen");
    updateStats();
    showNote();
    document.querySelectorAll("#submit div p").forEach(e => e.addEventListener('click', validate));
}

function validate(e){
    if(e.target.dataset.note !== undefined){
        blinkClick();
        if(e.target.dataset.note === note.name){
            stats.right ++;
            lastTen.right ++;
        }
        else{
            stats.wrong ++;
            lastTen.wrong ++;
        }
        updateStats();
        showNote();
        if(lastTen.right + lastTen.wrong >= 10 && group == 2){
            getDifficulty(lastTime - timeRemaining, lastTen.wrong);
            lastTime = timeRemaining;
            lastTen.right = 0;
            lastTen.wrong = 0;
        }
    }
}

function blinkClick(){
    let btn = document.querySelector(`[data-note="${note.name}"]`);
    btn.style.backgroundColor = "green";
    setTimeout(() => {
        btn.style.backgroundColor = '';
      }, 400);
}

function updateStats(){
    document.querySelector("#stats").innerHTML = `${stats.right}/${stats.wrong}`;
}

function showNote(){
    if(group == 2){
        note = getNoteViaTree();
    }
    else{
        note = getNote();
    }
    if(group == 3){
        if(style == "visual"){
            screen.innerHTML =  `<img alt="" src="/assets/images/color/${note.img}.png"></img>`;
        }
        else{
            screen.innerHTML =  `<img alt="" src="/assets/images/${note.img}.png"></img>`;
            playNote(note);
        }
    }
    else{
        screen.innerHTML =  `<img alt="" src="/assets/images/${note.img}.png"></img>`;
    }
}

function getNoteViaTree(){
    let half = Math.floor(Math.random()*50);
    let range = difficulty;
    if(range > 14){ range = 14; }
    let randomNote = Math.floor(Math.random()*range);
    let noteId = wholeNotes[randomNote];
      if(half <= difficulty){
      noteId = addHalf(noteId);
    }

    newNote = notes[noteId];
    if (newNote == note){
        return getNoteViaTree();
    }else{
        return newNote;
    }
}

function getNote(){
    let newNote = notes[Math.floor(Math.random()*notes.length)];
    if (newNote == note){
        return getNote();
    }else{
        return newNote;
    }
}

function playNote(note){
    const audio = new Audio(`/assets/audio/${note.audio}.mp3`);
    audio.play();
}
