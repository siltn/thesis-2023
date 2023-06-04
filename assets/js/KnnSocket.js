document.addEventListener("DOMContentLoaded", init);

function init() {
    setTimeout(() => {keepAwake(); }, 30000);
}

const serverAddress = 'wss://peppermint-eggplant-salary.glitch.me/';//siltn
let socket = new WebSocket(serverAddress);

socket.onmessage = function(event) {
    data = JSON.parse(event.data);
    if(data["status"] == 200){
        localStorage.setItem('style', data["style"]);
        window.location.href = "../";
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

socket.onopen = function(event){
    let group = localStorage.getItem("group");

    if(group == 0 && next > 5){
        console.log("addKnn");
        addKnn();
    }
    if(group == 3 && next > 5){
        console.log("getKnn");
        getKnn();
    }
}

function keepAwake(){
    socket.send(JSON.stringify({"operation": "awake"}));
    setTimeout(() => {keepAwake(); }, 60000);
}

function addKnn(){
    let stats = getStats();
    console.log(stats);
    if(stats["1"] == null || stats["2"] == null || stats["3"] == null || stats["4"] == null || stats["5"] == null ){
        return;
    }
    clearStats();
    stats.style = localStorage.getItem("style");
    const data = {"method": "add", "group": 0, "stats": stats};
    socket.send(JSON.stringify(data));
}

function getKnn(){
    let stats = getStats();
    console.log(stats);
    if(stats["1"] == null || stats["2"] == null || stats["3"] == null || stats["4"] == null || stats["5"] == null ){
        return;
    }
    const data = {"method": "get", "group": 3, "stats": stats};
    socket.send(JSON.stringify(data));
}

function getStats(){
    let statBuiler = {
        "1": JSON.parse(localStorage.getItem("type1")),
        "2": JSON.parse(localStorage.getItem("type2")),
        "3": JSON.parse(localStorage.getItem("type3")),
        "4": JSON.parse(localStorage.getItem("type4")),
        "5": JSON.parse(localStorage.getItem("type5")),
    };
    return statBuiler;
}
function clearStats(){
    localStorage.setItem("type1", null);
    localStorage.setItem("type2", null);
    localStorage.setItem("type3", null);
    localStorage.setItem("type4", null);
    localStorage.setItem("type5", null);
}