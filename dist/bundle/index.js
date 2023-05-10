(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

new Image().src = 'http://www.google.com/api/ss1.png';
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://httpbin/get', true);
xhr.send(); // for (let index = 0; index < 100; index++) {
//     console.log(index,'oo ni ge xx');    
// }

JSON.parse(undefined);
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciB1cGxvYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBsb2FkJyk7IC8vIHVwbG9hZC5vbmNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuLy8gICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbi8vICAgICAgICAgY29uc29sZS5sb2codGhpcy5yZXN1bHQpO1xuLy8gICAgIH1cbi8vICAgICAvLyByZWFkZXIucmVhZEFzVGV4dCh0aGlzLmZpbGVzWzBdKVxuLy8gICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKHRoaXMuZmlsZXNbMF0pXG4vLyAgICAgLy8gcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKHRoaXMuZmlsZXNbMF0pXG4vLyAgICAgLy8gcmVhZGVyLnJlYWRBc0JpbmFyeVN0cmluZyh0aGlzLmZpbGVzWzBdKVxuLy8gfVxuLy8gJChmdW5jdGlvbiAoKSB7XG4vLyAgICAgY29uc3Qgb2sgPSBuYXZpZ2F0b3Iuc2VuZEJlYWNvbignaHR0cHM6Ly9odHRwYmluLm9yZy9wb3N0JywgbmV3IEZvcm1EYXRhKCkuYXBwZW5kKCdqc29uJywgSlNPTi5zdHJpbmdpZnkoe1xuLy8gICAgICAgICBhOiAnMSdcbi8vICAgICB9KSkpO1xuLy8gICAgIGNvbnNvbGUubG9nKG9rKTtcbi8vICAgICAkKCcjZm9ybScpLmFqYXhGb3JtKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgYWxlcnQoJ2RvbmUnKVxuLy8gICAgIH0pO1xuLy8gfSlcblxubmV3IEltYWdlKCkuc3JjID0gJ2h0dHA6Ly93d3cuZ29vZ2xlLmNvbS9hcGkvc3MxLnBuZyc7XG52YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG54aHIub3BlbignR0VUJywgJ2h0dHBzOi8vaHR0cGJpbi9nZXQnLCB0cnVlKTtcbnhoci5zZW5kKCk7IC8vIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCAxMDA7IGluZGV4KyspIHtcbi8vICAgICBjb25zb2xlLmxvZyhpbmRleCwnb28gbmkgZ2UgeHgnKTsgICAgXG4vLyB9XG5cbkpTT04ucGFyc2UodW5kZWZpbmVkKTsiXX0=
