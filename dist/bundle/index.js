(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var Pubsub = require("../pubsub.class.js"); // 注入给每个 worker 的函数


function injectActions(callback) {
  var _this = this;

  var events = {};

  this.onmessage = function (e) {
    var _e$data = e.data,
        event = _e$data.event,
        dispatch = _e$data.dispatch;
    var eventList = events[event];

    if (eventList) {
      eventList.forEach(function (fn) {
        return fn(dispatch);
      });
    }
  };

  return callback({
    emit: function emit(event, dispatch) {
      _this.postMessage({
        event: event,
        dispatch: dispatch
      });
    },
    on: function on(event, fn) {
      var eventList = events[event];

      if (eventList) {
        eventList.push(fn);
        events[event] = eventList;
      } else {
        events[event] = [fn];
      }
    }
  });
}

function WebWorker(woker) {
  if (!(this instanceof WebWorker)) {
    return new WebWorker(woker);
  }

  var code = woker.toString();
  var blob = new Blob(["(".concat(code, ")(").concat(injectActions.toString(), ")")]);
  var worker = new Worker(URL.createObjectURL(blob));
  var events = {};

  worker.onmessage = function (e) {
    var _e$data2 = e.data,
        event = _e$data2.event,
        dispatch = _e$data2.dispatch;
    var eventList = events[event];

    if (eventList) {
      eventList.forEach(function (fn) {
        return fn(dispatch);
      });
    }
  };

  return {
    emit: function emit(event, dispatch) {
      worker.postMessage({
        event: event,
        dispatch: dispatch
      });
    },
    on: function on(event, fn) {
      var eventList = events[event];

      if (eventList) {
        eventList.push(fn);
        events[event] = eventList;
      } else {
        events[event] = [fn];
      }
    },
    close: function close() {
      return worker.close();
    }
  };
}

module.exports = WebWorker;
},{"../pubsub.class.js":3}],2:[function(require,module,exports){
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
},{"./browser/worker.js":1}],3:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function PubSub() {
  var _this = this;

  _classCallCheck(this, PubSub);

  var identity = 0;
  var Pool = {};

  this.on = function (eventName, fn) {
    var eventQueue = Pool[eventName] || [];
    fn._identity = identity;
    identity++;
    eventQueue.push(fn);
    Pool[eventName] = eventQueue;
  };

  this.emit = function (eventName) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var eventQueue = Pool[eventName] || [];
    eventQueue.forEach(function (fn) {
      return fn.apply(void 0, args);
    });
  };

  this.remove = function (eventName, fn) {
    var eventQueue = Pool[eventName] || [];
    Pool[eventName] = fn === undefined ? [] : eventQueue.filter(function (_fn) {
      return _fn.identity !== fn.identity;
    });
  };

  this.once = function (eventName, fn) {
    var decoration = function decoration() {
      fn.apply(void 0, arguments);
      this.remove(eventName, decoration);
    };

    _this.on(eventName, decoration);
  };
};
},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L2Jyb3dzZXIvd29ya2VyLmpzIiwiZGlzdC9pbmRleC5qcyIsImRpc3QvcHVic3ViLmNsYXNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBQdWJzdWIgPSByZXF1aXJlKFwiLi4vcHVic3ViLmNsYXNzLmpzXCIpOyAvLyDms6jlhaXnu5nmr4/kuKogd29ya2VyIOeahOWHveaVsFxuXG5cbmZ1bmN0aW9uIGluamVjdEFjdGlvbnMoY2FsbGJhY2spIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICB2YXIgZXZlbnRzID0ge307XG5cbiAgdGhpcy5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBfZSRkYXRhID0gZS5kYXRhLFxuICAgICAgICBldmVudCA9IF9lJGRhdGEuZXZlbnQsXG4gICAgICAgIGRpc3BhdGNoID0gX2UkZGF0YS5kaXNwYXRjaDtcbiAgICB2YXIgZXZlbnRMaXN0ID0gZXZlbnRzW2V2ZW50XTtcblxuICAgIGlmIChldmVudExpc3QpIHtcbiAgICAgIGV2ZW50TGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChmbikge1xuICAgICAgICByZXR1cm4gZm4oZGlzcGF0Y2gpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBjYWxsYmFjayh7XG4gICAgZW1pdDogZnVuY3Rpb24gZW1pdChldmVudCwgZGlzcGF0Y2gpIHtcbiAgICAgIF90aGlzLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICBkaXNwYXRjaDogZGlzcGF0Y2hcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgb246IGZ1bmN0aW9uIG9uKGV2ZW50LCBmbikge1xuICAgICAgdmFyIGV2ZW50TGlzdCA9IGV2ZW50c1tldmVudF07XG5cbiAgICAgIGlmIChldmVudExpc3QpIHtcbiAgICAgICAgZXZlbnRMaXN0LnB1c2goZm4pO1xuICAgICAgICBldmVudHNbZXZlbnRdID0gZXZlbnRMaXN0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXZlbnRzW2V2ZW50XSA9IFtmbl07XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gV2ViV29ya2VyKHdva2VyKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBXZWJXb3JrZXIpKSB7XG4gICAgcmV0dXJuIG5ldyBXZWJXb3JrZXIod29rZXIpO1xuICB9XG5cbiAgdmFyIGNvZGUgPSB3b2tlci50b1N0cmluZygpO1xuICB2YXIgYmxvYiA9IG5ldyBCbG9iKFtcIihcIi5jb25jYXQoY29kZSwgXCIpKFwiKS5jb25jYXQoaW5qZWN0QWN0aW9ucy50b1N0cmluZygpLCBcIilcIildKTtcbiAgdmFyIHdvcmtlciA9IG5ldyBXb3JrZXIoVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKSk7XG4gIHZhciBldmVudHMgPSB7fTtcblxuICB3b3JrZXIub25tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgX2UkZGF0YTIgPSBlLmRhdGEsXG4gICAgICAgIGV2ZW50ID0gX2UkZGF0YTIuZXZlbnQsXG4gICAgICAgIGRpc3BhdGNoID0gX2UkZGF0YTIuZGlzcGF0Y2g7XG4gICAgdmFyIGV2ZW50TGlzdCA9IGV2ZW50c1tldmVudF07XG5cbiAgICBpZiAoZXZlbnRMaXN0KSB7XG4gICAgICBldmVudExpc3QuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZuKGRpc3BhdGNoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGVtaXQ6IGZ1bmN0aW9uIGVtaXQoZXZlbnQsIGRpc3BhdGNoKSB7XG4gICAgICB3b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgIGRpc3BhdGNoOiBkaXNwYXRjaFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBvbjogZnVuY3Rpb24gb24oZXZlbnQsIGZuKSB7XG4gICAgICB2YXIgZXZlbnRMaXN0ID0gZXZlbnRzW2V2ZW50XTtcblxuICAgICAgaWYgKGV2ZW50TGlzdCkge1xuICAgICAgICBldmVudExpc3QucHVzaChmbik7XG4gICAgICAgIGV2ZW50c1tldmVudF0gPSBldmVudExpc3Q7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBldmVudHNbZXZlbnRdID0gW2ZuXTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNsb3NlOiBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgIHJldHVybiB3b3JrZXIuY2xvc2UoKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gV2ViV29ya2VyOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgV2ViV29ya2VyID0gcmVxdWlyZSgnLi9icm93c2VyL3dvcmtlci5qcycpO1xuXG52YXIgdGVzdFdzID0gV2ViV29ya2VyKGZ1bmN0aW9uIChpbmplY3QpIHtcbiAgaW5qZWN0KGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIG9uID0gX3JlZi5vbixcbiAgICAgICAgZW1pdCA9IF9yZWYuZW1pdDtcbiAgICBvbihcImZldGNoLWdldFwiLCBmdW5jdGlvbiAodXJsKSB7XG4gICAgICB2YXIgb1JlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgb1JlcS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbiAoZSkge30pO1xuICAgICAgb1JlcS5vcGVuKFwiR0VUXCIsIHVybCk7XG4gICAgICBvUmVxLnNlbmQoKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbnRlc3RXcy5lbWl0KFwiZmV0Y2gtZ2V0XCIsIFwiaHR0cDovLzEyNy4wLjAuMTo1NTAwL2dldFwiKTtcbnRlc3RXcy5vbihcImxvZ1wiLCBmdW5jdGlvbiAodmFsKSB7XG4gIGNvbnNvbGUubG9nKHZhbCk7XG59KTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBQdWJTdWIoKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFB1YlN1Yik7XG5cbiAgdmFyIGlkZW50aXR5ID0gMDtcbiAgdmFyIFBvb2wgPSB7fTtcblxuICB0aGlzLm9uID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgZm4pIHtcbiAgICB2YXIgZXZlbnRRdWV1ZSA9IFBvb2xbZXZlbnROYW1lXSB8fCBbXTtcbiAgICBmbi5faWRlbnRpdHkgPSBpZGVudGl0eTtcbiAgICBpZGVudGl0eSsrO1xuICAgIGV2ZW50UXVldWUucHVzaChmbik7XG4gICAgUG9vbFtldmVudE5hbWVdID0gZXZlbnRRdWV1ZTtcbiAgfTtcblxuICB0aGlzLmVtaXQgPSBmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIGV2ZW50UXVldWUgPSBQb29sW2V2ZW50TmFtZV0gfHwgW107XG4gICAgZXZlbnRRdWV1ZS5mb3JFYWNoKGZ1bmN0aW9uIChmbikge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHZvaWQgMCwgYXJncyk7XG4gICAgfSk7XG4gIH07XG5cbiAgdGhpcy5yZW1vdmUgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBmbikge1xuICAgIHZhciBldmVudFF1ZXVlID0gUG9vbFtldmVudE5hbWVdIHx8IFtdO1xuICAgIFBvb2xbZXZlbnROYW1lXSA9IGZuID09PSB1bmRlZmluZWQgPyBbXSA6IGV2ZW50UXVldWUuZmlsdGVyKGZ1bmN0aW9uIChfZm4pIHtcbiAgICAgIHJldHVybiBfZm4uaWRlbnRpdHkgIT09IGZuLmlkZW50aXR5O1xuICAgIH0pO1xuICB9O1xuXG4gIHRoaXMub25jZSA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGZuKSB7XG4gICAgdmFyIGRlY29yYXRpb24gPSBmdW5jdGlvbiBkZWNvcmF0aW9uKCkge1xuICAgICAgZm4uYXBwbHkodm9pZCAwLCBhcmd1bWVudHMpO1xuICAgICAgdGhpcy5yZW1vdmUoZXZlbnROYW1lLCBkZWNvcmF0aW9uKTtcbiAgICB9O1xuXG4gICAgX3RoaXMub24oZXZlbnROYW1lLCBkZWNvcmF0aW9uKTtcbiAgfTtcbn07Il19
