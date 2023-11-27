const params = new URLSearchParams(document.location.search);
if(params.size==0) params.append("i", 1);
const index = parseInt(params.get("i"), 10);

console.log(index);

let IndexDOM = document.getElementById("WindowIndex");

IndexDOM.textContent = index;