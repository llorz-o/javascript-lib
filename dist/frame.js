"use strict";

var prev = Date.now();

function fallback(fn) {
  var curr = Date.now();
  var ms = Math.max(0, 16 - (curr - prev));
  var id = setTimeout(fn, ms);
  prev = curr + ms;
  return id;
}

var iRaf = window.requestAnimationFrame || fallback;
var iCancel = window.cancelAnimationFrame || clearTimeout;

var raf = function raf(fn) {
  return iRaf(fn);
};

var cancelRaf = function cancelRaf(id) {
  return iCancel(id);
};

module.exports = {
  cancelRaf: cancelRaf,
  raf: raf
};