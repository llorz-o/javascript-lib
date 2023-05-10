"use strict";

var upload = document.getElementById('upload'); // upload.onchange = function () {
//     const reader = new FileReader();
//     reader.onload = function() {
//         console.log(this.result);
//     }
//     // reader.readAsText(this.files[0])
//     reader.readAsDataURL(this.files[0])
//     // reader.readAsArrayBuffer(this.files[0])
//     // reader.readAsBinaryString(this.files[0])
// }
// $(function () {
//     const ok = navigator.sendBeacon('https://httpbin.org/post', new FormData().append('json', JSON.stringify({
//         a: '1'
//     })));
//     console.log(ok);
//     $('#form').ajaxForm(function () {
//         alert('done')
//     });
// })

new Image().src = 'http://www.google.com/api/ss.png';
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://httpbin/get', true);
xhr.send(); // for (let index = 0; index < 100; index++) {
//     console.log(index,'oo ni ge xx');    
// }

JSON.parse(undefined);