let params = new URLSearchParams(document.location.search);
let index = parseInt(params.get("i"), 10);

console.log(index);

let IndexDOM = document.getElementById("WindowIndex");

IndexDOM.textContent = index;