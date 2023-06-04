document.addEventListener("DOMContentLoaded", init);

let strikes = 0;
let difficulty;

function init(){
    difficulty = localStorage.getItem('difficulty');
    if(difficulty == null){
        difficulty = 1;
    }
}

function getDifficulty(speed, mistakes){
    console.log("getDifficulty");
    difficulty++;
    
    if(speed > 10 || mistakes > 2){
        console.log(speed);
        console.log(mistakes);
      difficulty--;
      strikes++;
    }
    if(strikes >= 3){
        strikes = 0;
      difficulty--;
    }
    if(difficulty > 25){
        difficulty = 25;
    }
    if(difficulty < 1){
        difficulty = 1;
    }
    localStorage.setItem('difficulty', difficulty);
}

  function addHalf(noteId){
    noteId++;
    if(Math.random() < 0.5){
      noteId = noteId - 2;
    }
    if(noteId > 35){
      noteId = 35;
    }
    return noteId;
  }