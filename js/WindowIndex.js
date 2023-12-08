const bc = new BroadcastChannel("channel");
const params = new URLSearchParams(document.location.search);
var index = parseInt(params.get("i"), 10);

var indexed = false;

var indexS = 0;
var indexL = 0;

bc.addEventListener("message", e => {
    if(e.data.t=="IndexResponse"){
        indexS+=e.data.ind;
        console.log("received index: " + String(e.data.ind) + " added to s: " + String(indexS));
        indexL = Math.max(indexL, e.data.ind);
    }
    else if(e.data=="IndexRequest") {
        bc.postMessage({t: "IndexResponse", ind: index});
    }
    else document.getElementById("ReceivedMessage").textContent = e.data;
});

if(params.size==0){
    params.append("i", 1);
    bc.postMessage("IndexRequest");
}
index = parseInt(params.get("i"), 10);

window.onload = ()=>{
    setTimeout(()=>{
        
        index = (indexL + 1)*indexL/2 - indexS;
        console.log({index: index, indexL: indexL});
        index = (index<=0?indexL+1:index);
        document.getElementById("WindowIndex").textContent = index;
        indexed = true;
    }, 150);
}