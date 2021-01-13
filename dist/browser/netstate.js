"use strict";

var Ua = require("./userAgent.js");

function getNetState() {
  var _ref = window.navigator.connection || {},
      downlink = _ref.downlink,
      effectiveType = _ref.effectiveType,
      rtt = _ref.rtt,
      type = _ref.type;

  var onLine = window.navigator.onLine;
  var versions = Ua.getVer(); // effectiveType = effectiveType || type

  if (/NetType/.test(window.navigator.userAgent)) {
    // qq 和 微信 可以在 userAgent 中获取网络状态
    var NetType = window.navigator.userAgent.match(/NetType\/(\S*)/) || [];
    effectiveType = NetType[1] || effectiveType;
  } // 无法通过 navigator.connection 获取网络状态 ios 不支持, chrome 有怪异行为(在无网络的wifi下将导致错误的 rtt 评估)


  if (versions.ios || versions.webkit && type === 'wifi') {
    // 这里的 rtt不是真实的rtt 而是api请求与返回时间差的平均值
    var _rtt = assessmentNetstate();

    rtt = _rtt;
    onLine = true;

    if (_rtt > 3000) {
      effectiveType = 'slow-2g';
    } else {
      effectiveType = '2g';
    }

    if (_rtt < 1000) {
      effectiveType = '3g';
    }

    if (_rtt < 300) {
      effectiveType = '4g';
    }
  }

  return {
    downlink: downlink,
    effectiveType: effectiveType,
    rtt: rtt,
    onLine: onLine
  };
} // http请求性能评估

/**
 *
 * @param {Number} diffTime 一个成功的http请求的间隔时间
 * @param {Boolean} reqIsDone 请求是否完成
 */
// 连接池


var connectionPool = [];
var refreshTime = Date.now(); // 刷新时间

function reqPerformanceAssessment(diffTime, reqIsDone) {
  if (Date.now() - refreshTime < 2000) {
    connectionPool.push({
      diffTime: diffTime,
      reqIsDone: reqIsDone
    });
  } else {
    connectionPool = [{
      diffTime: diffTime,
      reqIsDone: reqIsDone
    }];
  }

  refreshTime = Date.now();
} // 评估网络状态,平均请求时长


function assessmentNetstate() {
  var totalConsume = 0;
  var count = 0;
  var res = 0;
  connectionPool.forEach(function (_ref2) {
    var diffTime = _ref2.diffTime,
        reqIsDone = _ref2.reqIsDone;

    if (reqIsDone || !reqIsDone && diffTime > 300) {
      // 有效数据
      count++;
      totalConsume += diffTime;
    }
  });
  res = totalConsume / count;
  if (isNaN(res)) return 0;else return res;
}

module.exports = {
  getNetState: getNetState,
  reqPerformanceAssessment: reqPerformanceAssessment
};