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
    }else{
        MovingState = "False";
    }
    document.getElementById("moving-state").textContent = MovingState;
    document.getElementById("moving-state").style.color = (MovingState=="False"?"red":"green");
}, 50);