"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function image2Blob(_ref) {
  var mime = _ref.mime,
      zipRatio = _ref.zipRatio,
      src = _ref.src,
      _ref$ratio = _ref.ratio,
      ratio = _ref$ratio === void 0 ? 1 : _ref$ratio;
  return new Promise(function (resolve, reject) {
    createImage({
      src: src
    }).then(function (_ref2) {
      var image = _ref2.image,
          width = _ref2.width,
          height = _ref2.height;

      try {
        var targetWidth = width * ratio;
        var targetHeight = height * ratio;

        var _createCanvas = createCanvas({
          width: targetWidth,
          height: targetHeight
        }),
            _createCanvas2 = _slicedToArray(_createCanvas, 2),
            canvas = _createCanvas2[0],
            context = _createCanvas2[1];

        context.drawImage(image, 0, 0, width, height, 0, 0, targetWidth, targetHeight); // 压缩

        zipBlobByCanvas(canvas, {
          mime: mime,
          ratio: zipRatio
        }).then(resolve);
      } catch (e) {
        return reject(e);
      }
    });
  });
}

function createImage() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      src = _ref3.src,
      _ref3$crossorigin = _ref3.crossorigin,
      crossorigin = _ref3$crossorigin === void 0 ? "anonymous" : _ref3$crossorigin;

  return new Promise(function (resolve, reject) {
    var image = new Image();
    image.crossorigin = crossorigin;

    image.onload = function (e) {
      var width = image.width,
          height = image.height;
      resolve({
        image: e.target,
        width: width,
        height: height
      });
    };

    image.onerror = function (err) {
      return reject(err);
    };

    image.src = src;
  });
}

function createCanvas() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref4$width = _ref4.width,
      width = _ref4$width === void 0 ? 100 : _ref4$width,
      _ref4$height = _ref4.height,
      height = _ref4$height === void 0 ? 100 : _ref4$height;

  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  var context = canvas.getContext('2d');
  return [canvas, context];
} // 通过canvas压缩图片转换为blob


function zipBlobByCanvas(canvas) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref5$mime = _ref5.mime,
      mime = _ref5$mime === void 0 ? "image/jpeg" : _ref5$mime,
      _ref5$ratio = _ref5.ratio,
      ratio = _ref5$ratio === void 0 ? 1 : _ref5$ratio;

  return new Promise(function (resolve, reject) {
    try {
      canvas.toBlob(function (blob) {
        if (blob === null) reject(new Error("blob is null"));
        resolve(blob);
      }, mime, ratio);
    } catch (error) {
      reject(error);
    }
  });
} // blob to base64


function blob2Base64(blob) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();

    reader.onload = function (e) {
      return resolve(e.target.result);
    };

    reader.onerror = function (err) {
      return reject(err);
    };

    reader.readAsDataURL(blob);
  });
}

module.exports = {
  image2Blob: image2Blob,
  createImage: createImage,
  createCanvas: createCanvas,
  zipBlobByCanvas: zipBlobByCanvas,
  blob2Base64: blob2Base64
};