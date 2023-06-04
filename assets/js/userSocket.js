document.addEventListener("DOMContentLoaded", init);

function init() {
    setTimeout(() => {keepAwake(); }, 30000);
}

const serverAddress = 'wss://carpal-polar-polo.glitch.me/';//siltn
let socket = new WebSocket(serverAddress);

socket.onmessage = function(event) {
    data = JSON.parse(event.data);
    console.log(data);
    if(data["status"] == 200){
        if(data.type == "login"){
            localStorage.setItem('group', data.account.type);
            localStorage.setItem('email', data.account.email);
            if(data.account.scores.length > 0){
                localStorage.setItem('firstTest', 1);
            }
            console.log(data.account.scores);
            if(data.account.scores.length === 0){
                window.location.href= "tutorial.html";
            }else{
                window.location.href= "index.html";
            }
        }
        else if(data.type = ""){

        }
    }
};

socket.onclose = function(event) {
    if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log('[close] Connection died');
    }
};

socket.onerror = function(error) {
    alert(`[error]`);
};

function keepAwake(){
    socket.send(JSON.stringify({"type": "awake", "email": email}));
    setTimeout(() => {keepAwake(); }, 30000);
}