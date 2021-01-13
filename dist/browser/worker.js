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