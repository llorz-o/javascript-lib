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