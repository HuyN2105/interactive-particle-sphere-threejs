const bc = new BroadcastChannel("channel");

bc.addEventListener("message", e => {
    if(e.data=="IndexRequest") bc.postMessage(1);
    else document.getElementById("ReceivedMessage").textContent = e.data;
});

document.getElementById("send").addEventListener("click", ()=>{
    bc.postMessage(document.getElementById("message").value);
});