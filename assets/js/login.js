document.addEventListener("DOMContentLoaded", init);

function init(){
    document.querySelector("#loginForm").addEventListener('submit', login);
}

function login(e){
    e.preventDefault();
    let email = document.querySelector("#email").value;
    const data = {"type": "create", "email": email};
    socket.send(JSON.stringify(data));
}