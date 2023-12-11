const bc = new BroadcastChannel("channel");

bc.addEventListener("message", e => {
    if(e.data.Request=="CoordinateChange"){
        document.getElementById(String(e.data.PartnerID)+"X").textContent = e.data.Coordinate.x;
        document.getElementById(String(e.data.PartnerID)+"Y").textContent = e.data.Coordinate.y;
        var t1 = e.data.Coordinate.y - window.screenY, t2 = e.data.Coordinate.x - window.screenX;
        document.getElementById("ball").style.left = (t2<0?0:(t2>200?200:t2));
        document.getElementById("ball").style.top = (t1<0?0:(t1>200?200:t1));
        console.log({top: t1, left: t2});
    }
});

var Index;

let PartnerItem = localStorage.getItem("PartnerList");
console.log(PartnerItem)
var PartnerList = [];

if(PartnerItem == null){
    PartnerList = [1];
    Index = 1;
    localStorage.setItem("PartnerList", "1");
}else{
    PartnerList = PartnerItem.split("-").map(x => parseInt(x, 10));
    for(var i = 1; i <= PartnerList.length; i++){
        if(i==PartnerList.length){
            Index = i+1;
            PartnerList.splice(Index-1, 0, Index);
            break;
        }
        if(PartnerList[i]>PartnerList[i-1]+1){
            Index = PartnerList[i-1]+1;
            PartnerList.splice(i, 0, Index);
            break;
        }
    }
    localStorage.setItem("PartnerList", PartnerList.join("-"));
}

console.log(PartnerList);

window.onload = () => {
    document.getElementById("WindowIndex").textContent = Index;
    setTimeout(() => {
        PartnerList.forEach((i) => {
            let div = document.createElement("div"), divX = document.createElement("p"), divY = document.createElement("p");
            div.setAttribute("id", i);
            divX.setAttribute("id", String(i)+"X");
            divY.setAttribute("id", String(i)+"Y");
            div.append("Partner: "+String(i), document.createElement("p"))
            div.append("x: ", divX);
            div.append("y: ", divY);
            document.getElementById("OtherPartner").append(div);
        })
    }, 50);

    // HANDLE WINDOW MOVE

    var MovingState = "False";

    var coordinate = {
        x: window.screenX,
        y: window.screenY
    };

    let cox = document.getElementById("coordinateX");
    let coy = document.getElementById("coordinateY");

    cox.textContent = coordinate.x;
    coy.textContent = coordinate.y;

    setInterval(()=>{
        if(window.screenX!=coordinate.x || window.screenY!=coordinate.y){
            coordinate = {
                x: window.screenX,
                y: window.screenY
            };
            cox.textContent = coordinate.x;
            coy.textContent = coordinate.y;
            MovingState = "True";
            bc.postMessage({Request: "CoordinateChange", PartnerID: Index, Coordinate: coordinate});
        }else{
            MovingState = "False";
        }
        document.getElementById("moving-state").textContent = MovingState;
        document.getElementById("moving-state").style.color = (MovingState=="False"?"red":"green");
    }, 50);
}

window.onbeforeunload = ()=>{
    PartnerList.splice(Index-1, 1);
    if(PartnerList.length == 0) localStorage.clear();
    else localStorage.setItem("PartnerList", PartnerList.join("-"));
}