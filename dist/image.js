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