const upload = document.getElementById("upload");

CatchError.setExtraData("test", "ssss");

new Image().src = "http://www.google.com/api/ss.png";

function test() {
  const e = new Error();
  console.log([e]);
}

test();

const xhr = new XMLHttpRequest();
xhr.open("GET", "https://httpbin/get", true);
xhr.send();

// for (let index = 0; index < 100; index++) {
//     console.log(index,'oo ni ge xx');
// }
JSON.parse(undefined);
