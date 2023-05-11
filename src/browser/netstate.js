const Ua = require("./userAgent.js");

function getNetState() {
  let {
    downlink, // 下行速度
    effectiveType, // 网络类型
    rtt, // rtt 估算往返时间
    type, // 网路类型*其他机型
    // saveData, // 打开数据保护模式
  } = window.navigator.connection || {};

  let { onLine } = window.navigator;

  const versions = Ua.getVer();

  // effectiveType = effectiveType || type

  if (/NetType/.test(window.navigator.userAgent)) {
    // qq 和 微信 可以在 userAgent 中获取网络状态
    let NetType = window.navigator.userAgent.match(/NetType\/(\S*)/) || [];
    effectiveType = NetType[1] || effectiveType;
  }

  // 无法通过 navigator.connection 获取网络状态 ios 不支持, chrome 有怪异行为(在无网络的wifi下将导致错误的 rtt 评估)
  if (versions.ios || (versions.webkit && type === "wifi")) {
    // 这里的 rtt不是真实的rtt 而是api请求与返回时间差的平均值
    let _rtt = assessmentNetstate();
    rtt = _rtt;
    onLine = true;

    if (_rtt > 3000) {
      effectiveType = "slow-2g";
    } else {
      effectiveType = "2g";
    }

    if (_rtt < 1000) {
      effectiveType = "3g";
    }

    if (_rtt < 300) {
      effectiveType = "4g";
    }
  }

  return {
    downlink,
    effectiveType,
    rtt,
    onLine,
  };
}

// http请求性能评估
/**
 *
 * @param {Number} diffTime 一个成功的http请求的间隔时间
 * @param {Boolean} reqIsDone 请求是否完成
 */
// 连接池
let connectionPool = [];
let refreshTime = Date.now(); // 刷新时间
function reqPerformanceAssessment(diffTime, reqIsDone) {
  if (Date.now() - refreshTime < 2000) {
    connectionPool.push({
      diffTime,
      reqIsDone,
    });
  } else {
    connectionPool = [
      {
        diffTime,
        reqIsDone,
      },
    ];
  }
  refreshTime = Date.now();
}

// 评估网络状态,平均请求时长
function assessmentNetstate() {
  let totalConsume = 0;
  let count = 0;
  let res = 0;
  connectionPool.forEach(({ diffTime, reqIsDone }) => {
    if (reqIsDone || (!reqIsDone && diffTime > 300)) {
      // 有效数据
      count++;
      totalConsume += diffTime;
    }
  });
  res = totalConsume / count;
  if (isNaN(res)) return 0;
  else return res;
}

module.exports = {
  getNetState,
  reqPerformanceAssessment,
};
