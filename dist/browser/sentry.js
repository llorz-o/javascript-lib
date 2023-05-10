"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  var zip = true;
  var oldError = console.error;
  var oldLog = console.log;
  var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Z"];
  var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var GET_TYPE = /^(?:\[object )([A-z]+)(?:])$/;
  var json = '{"type":"a","consoleType":"b","errorType":"c","to":"d","fullPath":"e","name":"f","meta":"g","noAuth":"h","from":"i","stack":"j","message":"k","info":"l","sourceTagName":"m","sourceId":"n","sourceClassName":"o","isRoot":"p","args":"q","fetchURL":"r","fetchStatus":"s","fetchStatusText":"t"}';
  var shortcutKeyMapping = JSON.parse(json);

  function _type(val) {
    var match = Object.prototype.toString.call(val).match(GET_TYPE);

    if (match && match.length === 2) {
      return match[1];
    } else {
      oldError("[\u53C2\u6570]:".concat(val, ",\u5339\u914D\u7ED3\u679C:").concat(match));
    }
  }

  var shield = function shield() {};

  var type = function type(val) {
    return _type(val);
  };

  var isElement = function isElement(v) {
    return _type(v).indexOf("Element") !== -1;
  };

  var isArray = function isArray(v) {
    return "Array" === _type(v);
  };

  var isNull = function isNull(v) {
    return "Null" === _type(v);
  };

  var isUndefined = function isUndefined(v) {
    return "Undefined" === _type(v);
  };

  var isBoolean = function isBoolean(v) {
    return "Boolean" === _type(v);
  };

  var isString = function isString(v) {
    return "String" === _type(v);
  };

  var isNumber = function isNumber(v) {
    return !isNaN(v) && "Number" === _type(v);
  };

  var isObject = function isObject(v) {
    return "Object" === _type(v);
  };

  var isFunction = function isFunction(v) {
    return "Function" === _type(v);
  };

  var isEmpty = function isEmpty(v) {
    if (isUndefined(v) || isNull(v)) return true;
    if (isArray(v) && v.length === 0) return true;
    if (isObject(v) && Object.keys(v).length === 0) return true;
    return isString(v) && v === "";
  };

  function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
      return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    });
  }

  var queue = [];
  var batchLength = 20;
  var clipLength = 100;
  var reportDebounceTimer = null;
  /**
   * 整个用户操作捕获以及上报有一个队列，记录用户操作
   * 控制台输出，touch事件，鼠标点击，键盘keydown事件
   * 路由跳转，所有请求的捕获，错误抛出
   */

  var CatchError = /*#__PURE__*/function () {
    function CatchError() {
      _classCallCheck(this, CatchError);
    }

    _createClass(CatchError, null, [{
      key: "report",
      value: function report(isInstant) {
        var len = queue.length;

        var _doIt = function _doIt(start) {
          clearTimeout(reportDebounceTimer);
          reportDebounceTimer = setTimeout(function () {
            var slice15 = queue.slice(start, len);
            queue = [];
            oldLog("已上报：", slice15);
            var jsonStr = JSON.stringify(slice15);
            CatchError.reportMethod('https://upload.wikimedia.org/wikipedia/commons/e/e6/1kb.png', {
              uu: CatchError.uuid,
              su: CatchError.sessionUUID,
              fu: CatchError.flushUUID,
              t: Date.now(),
              c: jsonStr
            }, function () {});
          }, 250);
        };

        var start = len - batchLength <= 0 ? 0 : len - batchLength;

        if (isInstant) {
          _doIt(start);
        } else if (len > clipLength) {
          queue = queue.slice(start, len);
        }
      }
    }, {
      key: "reportMethod",
      value: function reportMethod(url, data, done) {
        var xhrPost = function xhrPost() {
          try {
            var xhr = new XMLHttpRequest();
            var form = new FormData();
            form.append("d", JSON.stringify(data));
            xhr.open("POST", url, true);

            xhr.onreadystatechange = function () {
              if (xhr.readyState === 4) {
                xhr.status === 200 ? done(true) : done(false);
              }
            };

            xhr.send(form);
          } catch (error) {
            oldLog("xhrPost error", error);
            done(false);
          }
        };

        var imagePost = function imagePost() {
          var queryStr = "?d=".concat(fixedEncodeURIComponent(JSON.stringify(data)));
          var img = new Image();

          img.onload = function (e) {
            oldLog('imagePost onload', e);
            done(true);
          };

          img.onerror = function (e) {
            oldLog('imagePost onerror', e);
            xhrPost();
          };

          img.src = url + queryStr;
          return;
        };

        if (navigator.sendBeacon) {
          var form = new FormData();
          form.append("d", JSON.stringify(data));
          var ok = navigator.sendBeacon(url, form);
          oldLog("send beacon status:".concat(ok));
          ok ? done(true) : imagePost();
        } else {
          imagePost();
        }
      }
    }, {
      key: "pushIn",
      value: function pushIn(data) {
        data = Object.assign({}, data, {
          page: window.location.href // window: {
          // }

        });
        oldLog("pushIn:", data);
        if (zip) queue.push(CatchError.pushInQueue(data));else queue.push(data);

        if (data.type === "error") {
          CatchError.report(true);
        } else {
          CatchError.report();
        }
      }
      /**
       * 捕获路由错误
       * @param router
       */

    }, {
      key: "onRouterError",
      value: function onRouterError(router) {
        router.onError(function (err) {
          CatchError.pushIn({
            type: "error",
            consoleType: "",
            errorType: "vue-router",
            stack: err.stack,
            message: err.message
          });
        });
        router.beforeEach(function (to, from, next) {
          CatchError.pushIn({
            type: "router",
            consoleType: "",
            errorType: "",
            to: {
              fullPath: to.fullPath,
              name: to.name,
              meta: to.meta
            },
            from: {
              fullPath: from.fullPath,
              name: from.name,
              meta: from.meta
            }
          });
          next();
        });
      }
      /**
       * 捕获Vue实例上的错误
       * @param Vue
       */

    }, {
      key: "onVueError",
      value: function onVueError(Vue) {
        Vue.config.errorHandler = function (err, vm, info) {
          var el = vm.$el || {};
          CatchError.pushIn({
            type: "error",
            consoleType: "",
            errorType: "vue",
            stack: err.stack,
            message: err.message,
            info: info,
            sourceTagName: el.nodeName,
            sourceId: el.id,
            sourceClassName: el.className,
            isRoot: !vm.$el
          });
        };
      }
      /**
       * 初始化错误捕获
       */

    }, {
      key: "init",
      value: function init() {
        window.addEventListener("error", function (e) {
          var message = e.message,
              source = e.source,
              lineno = e.lineno,
              colno = e.colno,
              error = e.error,
              filename = e.filename;
          var target = e.target || e.srcElement;
          var isElementTarget = isElement(target);

          if (isElementTarget) {
            if (target.id === "ignore") {
              oldLog("target is marked as ignore");
              return true;
            }

            CatchError.pushIn({
              type: "error",
              consoleType: "",
              errorType: "source",
              sourceTagName: target.nodeName,
              sourceId: target.id,
              sourceClassName: target.className,
              sourceSrc: target.src || target.href
            });
          } else {
            CatchError.pushIn(_defineProperty({
              type: "error",
              consoleType: "",
              errorType: "error",
              stack: error.stack,
              message: error.message,
              lineno: lineno,
              colno: colno,
              filename: filename
            }, "message", message));
          }

          return true;
        }, true);
        window.addEventListener("unhandledrejection", function (e) {
          var error = e;

          try {
            if ("reason" in e) {
              error = e.reason;
            } else if ("detail" in e && "reason" in e.detail) {
              error = e.detail.reason;
            }
          } catch (_oO) {}

          CatchError.pushIn({
            type: "error",
            consoleType: "",
            errorType: "promise",
            stack: error.stack,
            message: error.message
          });
        });

        var handleArgs = function handleArgs(args) {
          return args.map(function (item) {
            try {
              if (item) return JSON.stringify(item);else return item;
            } catch (error) {
              return {
                explain: "handleArgs error type:".concat(type(item)),
                stack: error.stack,
                message: error.message
              };
            }
          });
        };

        console.error = function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          CatchError.pushIn({
            type: "console",
            consoleType: "error",
            errorType: "",
            args: handleArgs(args)
          });
          return oldError.apply(console, args);
        };

        console.log = function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          CatchError.pushIn({
            type: "console",
            consoleType: "log",
            errorType: "",
            args: handleArgs(args)
          });
          return oldLog.apply(console, args);
        };
      }
      /**
       * 获取所有加载完成的图片
       */
      // static entries() {
      //     const imgTags = document.getElementsByTagName('img')
      //     const loadedImages = performance.getEntries().filter(i => i.initiatorType === 'img')
      // }

    }, {
      key: "unknownEmit",
      value: function unknownEmit(error) {
        if (error && error.toString) {
          CatchError.pushIn({
            type: "error",
            consoleType: "emit",
            errorType: "",
            message: error.toString()
          });
        } else {
          CatchError.pushIn({
            type: "error",
            consoleType: "emit",
            errorType: "",
            message: "unknown data: ".concat(error)
          });
        }
      }
    }, {
      key: "handleEmitError",
      value: function handleEmitError(error, errorType) {
        if (error instanceof Error) {
          var request = error.request || (errorType === 'fetch' ? {
            statusText: "浏览器错误, 请求未发出！！"
          } : {});
          var data = {
            type: "error",
            consoleType: "",
            errorType: error.request ? "fetch" : errorType,
            stack: error.stack,
            message: error.message,
            extra: error.extra
          };

          if (request) {
            Object.assign(data, {
              fetchURL: request.responseURL,
              fetchStatus: request.status,
              fetchStatusText: request.statusText
            });
          }

          CatchError.pushIn(data);
        } else if (error && error.toString) {
          if (isObject(error) || isArray(error)) {
            try {
              CatchError.pushIn({
                type: "error",
                consoleType: "emit",
                errorType: errorType,
                message: JSON.stringify(error),
                extra: error.extra
              });
            } catch (error) {
              CatchError.pushIn({
                type: "error",
                consoleType: "emit",
                errorType: errorType,
                stack: error.stack,
                message: error.message,
                explain: "this error cuz of ".concat(type(error), " JSON stringify failed!")
              });
            }
          } else {
            CatchError.pushIn({
              type: "error",
              consoleType: "emit",
              errorType: errorType,
              message: error.toString(),
              extra: error.extra
            });
          }
        } else {
          CatchError.pushIn({
            type: "error",
            consoleType: "emit",
            errorType: errorType,
            message: "unknown data: ".concat(error, " type: ").concat(type(error))
          });
        }
      } // 业务逻辑错误

    }, {
      key: "emitBusinessError",
      value: function emitBusinessError(error, msg) {
        if (error && error.extra === undefined) error.extra = msg;
        oldLog("emit business msg:", msg, [error]);
        CatchError.handleEmitError(error, "business");
      } // 初始化错误

    }, {
      key: "emitInitalError",
      value: function emitInitalError(error, msg) {
        if (error && error.extra === undefined) error.extra = msg;
        oldLog("emit initial msg:", msg, [error]);
        CatchError.handleEmitError(error, "inital");
      } // 请求错误

    }, {
      key: "emitFetchError",
      value: function emitFetchError(error, msg) {
        if (error && error.extra === undefined) error.extra = msg;
        oldLog("emit fetch msg:", msg, [error]);
        CatchError.handleEmitError(error, "fetch");
      }
    }, {
      key: "randomNumber",
      value: function randomNumber(rdm) {
        var index = Math.floor(rdm * numbers.length);
        return numbers[index];
      }
    }, {
      key: "randomLetter",
      value: function randomLetter(rdm) {
        var index = Math.floor(rdm * alphabet.length);
        return alphabet[index];
      }
    }, {
      key: "fakeRandom",
      value: function fakeRandom(seed) {
        seed = (seed * 9301 + 49297) % 233280; //为何使用这三个数?

        return seed / 233280.0;
      }
    }, {
      key: "random",
      value: function random(number) {
        var today = new Date();
        var seed = today.getTime();
        return Math.ceil(CatchError.fakeRandom(seed) * number);
      }
    }, {
      key: "pushInQueue",
      value: function pushInQueue(data) {
        var _data = JSON.parse(JSON.stringify(data));

        var toShortcutKey = function toShortcutKey(o) {
          if (isObject(o)) {
            Object.keys(o).forEach(function (k) {
              var shortCut = shortcutKeyMapping[k];

              if (shortCut) {
                o[shortCut] = o[k];
                delete o[k];
              }

              toShortcutKey(o[shortCut]);
            });
          } else if (isArray(o)) {
            o.forEach(function (item) {
              return toShortcutKey(item);
            });
          }
        };

        toShortcutKey(_data);
        return _data;
      }
    }]);

    return CatchError;
  }();

  var getUUID = function getUUID() {
    var seed = Math.random() * Date.now();
    var random = CatchError.fakeRandom(seed);
    var uuid = "";

    for (var index = 0; index < 8; index++) {
      if (random > 0.45) {
        uuid += CatchError.randomNumber(random);
      } else {
        uuid += CatchError.randomLetter(random);
      }

      random = CatchError.fakeRandom(random * Date.now());
    }

    return uuid;
  };

  CatchError.uuid = window.localStorage.getItem("ERR_UUID") || function () {
    var uuid = getUUID();
    window.localStorage.setItem("ERR_UUID", uuid);
    return uuid;
  }();

  CatchError.sessionUUID = window.sessionStorage.getItem("ERR_SESSION_UUID") || function () {
    var uuid = getUUID();
    window.sessionStorage.setItem("ERR_SESSION_UUID", uuid);
    return uuid;
  }();

  CatchError.flushUUID = getUUID();

  CatchError.lastReport = window.localStorage.getItem("ERR_LAST_REPORT") || function () {
    var now = Date.now();
    window.localStorage.setItem("ERR_LAST_REPORT", now);
    return now;
  }();

  window.CatchError = CatchError;

  window.getQueue = function () {
    return _toConsumableArray(queue);
  };

  window.getKeys = function () {
    var keys = [];

    var deep = function deep(o) {
      if (isObject(o)) {
        Object.keys(o).forEach(function (k) {
          keys.push(k);
          deep(o[k]);
        });
      } else if (isArray(o)) {
        o.forEach(function (item) {
          deep(item);
        });
      }
    };

    deep(queue);
    var ks = Array.from(new Set(keys));
    var mapping = {};
    ks.forEach(function (v, index) {
      mapping[v] = alphabet[index];
    });
    return JSON.stringify(mapping);
  };

  CatchError.init(); // for (let index = 0; index < 100; index++) {
  //     console.log(CatchError.fakeRandom(Date.now() * Math.random()));
  // }
})(window);