const bc = new BroadcastChannel("channel");
const params = new URLSearchParams(document.location.search);
var index = parseInt(params.get("i"), 10);

var indexed = false;

var indexS = 0;
var indexList = [];

bc.addEventListener("message", e => {
    if(e.data.t=="IndexResponse"){
        indexS+=e.data.ind;
        indexList.push(e.data.ind);
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
        indexList.sort;
        console.log(indexList)
        let s = indexList.length;
        if(s==0) index = 1;
        else{
            index = (indexList[s-1] + 1)*indexList[s-1]/2 - indexS;
            index = (index<=0?indexList[s-1]+1:index);
        }
        document.getElementById("WindowIndex").textContent = index;
        indexed = true;
    }, 200);

    setTimeout(()=>{
        indexList.forEach((i) => {
            let t = document.createElement("div");
            t.setAttribute("id", i);
            document.getElementById("OtherPartner").append(String(i), t);
        })
    }, 200);

}