(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function image2Blob() {}

function createImage() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      src = _ref.src,
      _ref$crossorigin = _ref.crossorigin,
      crossorigin = _ref$crossorigin === void 0 ? "anonymous" : _ref$crossorigin,
      _ref$imageLoaded = _ref.imageLoaded,
      imageLoaded = _ref$imageLoaded === void 0 ? function () {} : _ref$imageLoaded;

  var image = new Image();
  image.crossorigin = crossorigin;
  image.onload = imageLoaded;
  image.src = src;
  var width = image.width,
      height = image.height;
  console.log(width, height);
  return {
    image: image,
    width: width,
    height: height
  };
}

function createCanvas() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$width = _ref2.width,
      width = _ref2$width === void 0 ? 100 : _ref2$width,
      _ref2$height = _ref2.height,
      height = _ref2$height === void 0 ? 100 : _ref2$height;

  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  var context = canvas.getContext('2d');
  return [canvas, context];
}

module.exports = {
  image2Blob: image2Blob,
  createImage: createImage,
  createCanvas: createCanvas
};
},{}],2:[function(require,module,exports){
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require("./image.js"),
    image2Blob = _require.image2Blob,
    createCanvas = _require.createCanvas,
    createImage = _require.createImage;

(function () {
  var _createImage = createImage({
    src: "./public/assets/2020-12-23-2620414866219008.jpg",
    imageLoaded: function imageLoaded() {
      var _createCanvas = createCanvas({
        width: width / 2,
        height: height / 2
      }),
          _createCanvas2 = _slicedToArray(_createCanvas, 2),
          canvas = _createCanvas2[0],
          context = _createCanvas2[1];

      context.drawImage(image, 0, 0, width, height, 0, 0, width / 2, height / 2);
      document.getElementsByTagName("body")[0].appendChild(canvas);
      console.log(image, canvas);
    }
  }),
      image = _createImage.image,
      width = _createImage.width,
      height = _createImage.height;
})();
},{"./image.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L2ltYWdlLmpzIiwiZGlzdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gaW1hZ2UyQmxvYigpIHt9XG5cbmZ1bmN0aW9uIGNyZWF0ZUltYWdlKCkge1xuICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge30sXG4gICAgICBzcmMgPSBfcmVmLnNyYyxcbiAgICAgIF9yZWYkY3Jvc3NvcmlnaW4gPSBfcmVmLmNyb3Nzb3JpZ2luLFxuICAgICAgY3Jvc3NvcmlnaW4gPSBfcmVmJGNyb3Nzb3JpZ2luID09PSB2b2lkIDAgPyBcImFub255bW91c1wiIDogX3JlZiRjcm9zc29yaWdpbixcbiAgICAgIF9yZWYkaW1hZ2VMb2FkZWQgPSBfcmVmLmltYWdlTG9hZGVkLFxuICAgICAgaW1hZ2VMb2FkZWQgPSBfcmVmJGltYWdlTG9hZGVkID09PSB2b2lkIDAgPyBmdW5jdGlvbiAoKSB7fSA6IF9yZWYkaW1hZ2VMb2FkZWQ7XG5cbiAgdmFyIGltYWdlID0gbmV3IEltYWdlKCk7XG4gIGltYWdlLmNyb3Nzb3JpZ2luID0gY3Jvc3NvcmlnaW47XG4gIGltYWdlLm9ubG9hZCA9IGltYWdlTG9hZGVkO1xuICBpbWFnZS5zcmMgPSBzcmM7XG4gIHZhciB3aWR0aCA9IGltYWdlLndpZHRoLFxuICAgICAgaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICBjb25zb2xlLmxvZyh3aWR0aCwgaGVpZ2h0KTtcbiAgcmV0dXJuIHtcbiAgICBpbWFnZTogaW1hZ2UsXG4gICAgd2lkdGg6IHdpZHRoLFxuICAgIGhlaWdodDogaGVpZ2h0XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNhbnZhcygpIHtcbiAgdmFyIF9yZWYyID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fSxcbiAgICAgIF9yZWYyJHdpZHRoID0gX3JlZjIud2lkdGgsXG4gICAgICB3aWR0aCA9IF9yZWYyJHdpZHRoID09PSB2b2lkIDAgPyAxMDAgOiBfcmVmMiR3aWR0aCxcbiAgICAgIF9yZWYyJGhlaWdodCA9IF9yZWYyLmhlaWdodCxcbiAgICAgIGhlaWdodCA9IF9yZWYyJGhlaWdodCA9PT0gdm9pZCAwID8gMTAwIDogX3JlZjIkaGVpZ2h0O1xuXG4gIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gIHJldHVybiBbY2FudmFzLCBjb250ZXh0XTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGltYWdlMkJsb2I6IGltYWdlMkJsb2IsXG4gIGNyZWF0ZUltYWdlOiBjcmVhdGVJbWFnZSxcbiAgY3JlYXRlQ2FudmFzOiBjcmVhdGVDYW52YXNcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoXCIuL2ltYWdlLmpzXCIpLFxuICAgIGltYWdlMkJsb2IgPSBfcmVxdWlyZS5pbWFnZTJCbG9iLFxuICAgIGNyZWF0ZUNhbnZhcyA9IF9yZXF1aXJlLmNyZWF0ZUNhbnZhcyxcbiAgICBjcmVhdGVJbWFnZSA9IF9yZXF1aXJlLmNyZWF0ZUltYWdlO1xuXG4oZnVuY3Rpb24gKCkge1xuICB2YXIgX2NyZWF0ZUltYWdlID0gY3JlYXRlSW1hZ2Uoe1xuICAgIHNyYzogXCIuL3B1YmxpYy9hc3NldHMvMjAyMC0xMi0yMy0yNjIwNDE0ODY2MjE5MDA4LmpwZ1wiLFxuICAgIGltYWdlTG9hZGVkOiBmdW5jdGlvbiBpbWFnZUxvYWRlZCgpIHtcbiAgICAgIHZhciBfY3JlYXRlQ2FudmFzID0gY3JlYXRlQ2FudmFzKHtcbiAgICAgICAgd2lkdGg6IHdpZHRoIC8gMixcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHQgLyAyXG4gICAgICB9KSxcbiAgICAgICAgICBfY3JlYXRlQ2FudmFzMiA9IF9zbGljZWRUb0FycmF5KF9jcmVhdGVDYW52YXMsIDIpLFxuICAgICAgICAgIGNhbnZhcyA9IF9jcmVhdGVDYW52YXMyWzBdLFxuICAgICAgICAgIGNvbnRleHQgPSBfY3JlYXRlQ2FudmFzMlsxXTtcblxuICAgICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDAsIHdpZHRoLCBoZWlnaHQsIDAsIDAsIHdpZHRoIC8gMiwgaGVpZ2h0IC8gMik7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF0uYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgICAgIGNvbnNvbGUubG9nKGltYWdlLCBjYW52YXMpO1xuICAgIH1cbiAgfSksXG4gICAgICBpbWFnZSA9IF9jcmVhdGVJbWFnZS5pbWFnZSxcbiAgICAgIHdpZHRoID0gX2NyZWF0ZUltYWdlLndpZHRoLFxuICAgICAgaGVpZ2h0ID0gX2NyZWF0ZUltYWdlLmhlaWdodDtcbn0pKCk7Il19
