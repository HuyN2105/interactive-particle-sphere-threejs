const bc = new BroadcastChannel("channel");

bc.addEventListener("message", e => {
    if(e.data.Request=="CoordinateChange"){
        var partnerX = e.data.Coordinate.x,
        partnerY = e.data.Coordinate.y;
        document.getElementById(String(e.data.PartnerID)+"X").textContent = partnerX;
        document.getElementById(String(e.data.PartnerID)+"Y").textContent = partnerY;

        var elementRect = document.getElementById('outerBox').getBoundingClientRect();
            
        var elementXOnScreen = elementRect.left + window.screenX + 11.5 + 25;
        var elementYOnScreen = elementRect.top + window.screenY + 198.5 - 15;

        var leftAdjustment = Math.abs(Math.abs(elementXOnScreen - partnerX)/2),
        topAdjustment = Math.abs(Math.abs(elementYOnScreen - partnerY)/2);
        if(elementXOnScreen > partnerX) leftAdjustment*=-1;
        if(elementYOnScreen > partnerY) topAdjustment*=-1;
        if(topAdjustment<0) topAdjustment = 0;
        else if(topAdjustment>200) topAdjustment = 200;
        if(leftAdjustment<0) leftAdjustment=0;
        else if(leftAdjustment>200) leftAdjustment = 200;
        ball.style.left = String(leftAdjustment)+"px";
        ball.style.top = String(topAdjustment)+"px";
        // console.log({top: leftAdjustment, left: topAdjustment});   
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
            var elementRect = document.getElementById('outerBox').getBoundingClientRect();
            
            var elementXOnScreen = elementRect.left + window.screenX + 112;
            var elementYOnScreen = elementRect.top + window.screenY + 210.5;   
            console.log({x: elementXOnScreen, y: elementYOnScreen});
            bc.postMessage({Request: "CoordinateChange", PartnerID: Index, Coordinate: {x: elementXOnScreen, y: elementYOnScreen}});    
        }else{
            MovingState = "False";
        }
        document.getElementById("moving-state").textContent = MovingState;
        document.getElementById("moving-state").style.color = (MovingState=="False"?"red":"green");
    }, 30);
}

window.onbeforeunload = ()=>{
    PartnerList.splice(Index-1, 1);
    if(PartnerList.length == 0) localStorage.clear();
    else localStorage.setItem("PartnerList", PartnerList.join("-"));
}