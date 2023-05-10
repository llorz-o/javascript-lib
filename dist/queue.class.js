"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function Queue() {
  _classCallCheck(this, Queue);

  var arr = []; //入队操作

  this.push = function (element) {
    arr.push(element);
    return true;
  }; //出队操作


  this.pop = function () {
    return arr.shift();
  }; //获取队首


  this.getFront = function () {
    return arr[0];
  }; //获取队尾


  this.getRear = function () {
    return arr[arr.length - 1];
  }; //清空队列


  this.clear = function () {
    arr = [];
  }; //获取队长


  this.size = function () {
    return arr.length;
  };
};