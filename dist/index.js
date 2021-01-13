"use strict";

var WebWorker = require('./browser/worker.js');

var testWs = WebWorker(function (inject) {
  inject(function (_ref) {
    var on = _ref.on,
        emit = _ref.emit;
    on("fetch-get", function (url) {
      var oReq = new XMLHttpRequest();
      oReq.addEventListener("load", function (e) {});
      oReq.open("GET", url);
      oReq.send();
    });
  });
});
testWs.emit("fetch-get", "http://127.0.0.1:5500/get");
testWs.on("log", function (val) {
  console.log(val);
});