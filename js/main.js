const bc = new BroadcastChannel("channel");
const params = new URLSearchParams(document.location.search);
var index = parseInt(params.get("i"), 10);

var indexed = false;

bc.addEventListener("message", e => {
    if(e.data.t=="IndexResponse"){
        if(index < e.data.ind && !indexed){
            index = parseInt(e.data.ind, 10);
            document.getElementById("WindowIndex").textContent = index;
        }
    }
    else if(e.data=="IndexRequest") bc.postMessage({t: "IndexResponse", ind: index+1});
    else document.getElementById("ReceivedMessage").textContent = e.data;
});

if(params.size==0){
    params.append("i", 1);
    bc.postMessage("IndexRequest");
}
index = parseInt(params.get("i"), 10);

document.getElementById("WindowIndex").textContent = index

document.getElementById("send").addEventListener("click", ()=>{
    bc.postMessage(document.getElementById("message").value);
});

window.onload = ()=>{
    setTimeout(()=>{indexed = true;}, 150);
}