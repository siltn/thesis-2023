document.addEventListener("DOMContentLoaded", init);

let email;
let screen;
let time;
let stats = {
    right: 0,
    wrong: 0
};
let note;
const duration = 120;
let timeRemaining = duration;

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
      const data = {"type": "test", "email": email, "stats": stats};
      socket.send(JSON.stringify(data));
      localStorage.setItem('firstTest', 1); 
      window.location.href = `stats.html?right=${stats.right}&wrong=${stats.wrong}&next=start`;
    }
  }, 1000);

function init(){
    email = localStorage.getItem('email');
    const urlParams = new URLSearchParams(window.location.search);
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
        }
        else{
            stats.wrong ++;
        }
        updateStats();
        showNote();
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
    note = getNote();
    screen.innerHTML =  `<img alt="" src="/assets/images/${note.img}.png"></img>`;
}

function getNote(){
    let newNote = notes[Math.floor(Math.random()*notes.length)];
    if (newNote == note){
        return getNote();
    }else{
        return newNote;
    }
}

function changeBackground(reset = false){
    const screen = document.querySelector('#screen');

    if (reset) {
        screen.style.backgroundColor = 'white';
      } else {
        const index = Math.floor(Math.random() * colors.length);
        screen.style.backgroundColor = colors[index];
      }
}