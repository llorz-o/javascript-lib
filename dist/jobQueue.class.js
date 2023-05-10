"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Queue = require("./queue.class.js");

module.exports = /*#__PURE__*/function (_Queue) {
  _inherits(JobQueue, _Queue);

  var _super = _createSuper(JobQueue);

  function JobQueue() {
    var _this;

    _classCallCheck(this, JobQueue);

    _this = _super.call(this);
    var isStarted = false;

    _this.addJob = function (fn) {
      return _this.push(fn);
    };

    _this.start = function () {
      return new Promise(function (resolve, reject) {
        try {
          var start = function start() {
            var firstFn = _this.getFront();

            if (firstFn) {
              firstFn(function () {
                _this.pop();

                start();
              });
            } else {
              // 当前没有元素
              isStarted = false;
              resolve();
            }
          };

          if (_this.isStarted) {
            // 队列已经开始
            return console.warn("当前队列已经开始");
          } else {
            isStarted = true;
            start();
          }
        } catch (error) {
          console.error(error);
          reject(error);
        }
      });
    };

    return _this;
  }

  return JobQueue;
}(Queue);
/**
 *
 const JobQueue = require('./jobQueue.class')

 const jobQueue = new JobQueue

 jobQueue.addJob((next, a) => {
     console.log('1')
     next();
 })
 jobQueue.addJob((next) => {
     console.log('2')
     next();
 })
 jobQueue.addJob((next) => {
     console.log('3')
     next();
 })
 jobQueue.addJob((next) => {
     console.log('4')
     next();
 })
 jobQueue.addJob((next) => {
     console.log('5')
     next();
 })

 jobQueue.addJob((next, a) => {
     next();
     console.log('6')
 })
 jobQueue.addJob((next) => {
     next();
     console.log('7')
 })
 jobQueue.addJob((next) => {
     next();
     console.log('8')
 })
 jobQueue.addJob((next) => {
     next();
     console.log('9')
 })
 jobQueue.addJob((next) => {
     next();
     console.log('10')
 })

 jobQueue.start().then(() => {
     console.log('finish');
 })
 
 */