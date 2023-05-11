"use strict";

var upload = document.getElementById("upload");
new Image().src = "http://www.google.com/api/ss.png";

function test() {
  var e = new Error();
  console.log([e]);
}

test();
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://httpbin/get", true);
xhr.send(); // for (let index = 0; index < 100; index++) {
//     console.log(index,'oo ni ge xx');
// }

JSON.parse(undefined);