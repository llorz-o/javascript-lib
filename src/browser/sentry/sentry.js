// 设备信息收集
const DeviceInfo = (function () {
  let root = typeof self !== "undefined" ? self : this;
  let _window = root || {};
  // 变量库
  let VariableLibrary = {
    navigator: typeof root.navigator != "undefined" ? root.navigator : {},
    // 信息map
    infoMap: {
      engine: ["WebKit", "Trident", "Gecko", "Presto"],
      browser: [
        "Safari",
        "Chrome",
        "Edge",
        "IE",
        "Firefox",
        "Firefox Focus",
        "Chromium",
        "Opera",
        "Vivaldi",
        "Yandex",
        "Arora",
        "Lunascape",
        "QupZilla",
        "Coc Coc",
        "Kindle",
        "Iceweasel",
        "Konqueror",
        "Iceape",
        "SeaMonkey",
        "Epiphany",
        "360",
        "360SE",
        "360EE",
        "UC",
        "QQBrowser",
        "QQ",
        "Baidu",
        "Maxthon",
        "Sogou",
        "LBBROWSER",
        "2345Explorer",
        "TheWorld",
        "XiaoMi",
        "Quark",
        "Qiyu",
        "Wechat",
        "Taobao",
        "Alipay",
        "Weibo",
        "Douban",
        "Suning",
        "iQiYi",
      ],
      os: [
        "Windows",
        "Linux",
        "Mac OS",
        "Android",
        "Ubuntu",
        "FreeBSD",
        "Debian",
        "iOS",
        "Windows Phone",
        "BlackBerry",
        "MeeGo",
        "Symbian",
        "Chrome OS",
        "WebOS",
      ],
      device: ["Mobile", "Tablet", "iPad"],
    },
  };
  // 方法库
  let MethodLibrary = (function () {
    return {
      // 获取匹配库
      getMatchMap: function (u) {
        return {
          // 内核
          Trident: u.indexOf("Trident") > -1 || u.indexOf("NET CLR") > -1,
          Presto: u.indexOf("Presto") > -1,
          WebKit: u.indexOf("AppleWebKit") > -1,
          Gecko: u.indexOf("Gecko/") > -1,
          // 浏览器
          Safari: u.indexOf("Safari") > -1,
          Chrome: u.indexOf("Chrome") > -1 || u.indexOf("CriOS") > -1,
          IE: u.indexOf("MSIE") > -1 || u.indexOf("Trident") > -1,
          Edge: u.indexOf("Edge") > -1,
          Firefox: u.indexOf("Firefox") > -1 || u.indexOf("FxiOS") > -1,
          "Firefox Focus": u.indexOf("Focus") > -1,
          Chromium: u.indexOf("Chromium") > -1,
          Opera: u.indexOf("Opera") > -1 || u.indexOf("OPR") > -1,
          Vivaldi: u.indexOf("Vivaldi") > -1,
          Yandex: u.indexOf("YaBrowser") > -1,
          Arora: u.indexOf("Arora") > -1,
          Lunascape: u.indexOf("Lunascape") > -1,
          QupZilla: u.indexOf("QupZilla") > -1,
          "Coc Coc": u.indexOf("coc_coc_browser") > -1,
          Kindle: u.indexOf("Kindle") > -1 || u.indexOf("Silk/") > -1,
          Iceweasel: u.indexOf("Iceweasel") > -1,
          Konqueror: u.indexOf("Konqueror") > -1,
          Iceape: u.indexOf("Iceape") > -1,
          SeaMonkey: u.indexOf("SeaMonkey") > -1,
          Epiphany: u.indexOf("Epiphany") > -1,
          360: u.indexOf("QihooBrowser") > -1 || u.indexOf("QHBrowser") > -1,
          "360EE": u.indexOf("360EE") > -1,
          "360SE": u.indexOf("360SE") > -1,
          UC: u.indexOf("UC") > -1 || u.indexOf(" UBrowser") > -1,
          QQBrowser: u.indexOf("QQBrowser") > -1,
          QQ: u.indexOf("QQ/") > -1,
          Baidu: u.indexOf("Baidu") > -1 || u.indexOf("BIDUBrowser") > -1,
          Maxthon: u.indexOf("Maxthon") > -1,
          Sogou: u.indexOf("MetaSr") > -1 || u.indexOf("Sogou") > -1,
          LBBROWSER: u.indexOf("LBBROWSER") > -1,
          "2345Explorer": u.indexOf("2345Explorer") > -1,
          TheWorld: u.indexOf("TheWorld") > -1,
          XiaoMi: u.indexOf("MiuiBrowser") > -1,
          Quark: u.indexOf("Quark") > -1,
          Qiyu: u.indexOf("Qiyu") > -1,
          Wechat: u.indexOf("MicroMessenger") > -1,
          Taobao: u.indexOf("AliApp(TB") > -1,
          Alipay: u.indexOf("AliApp(AP") > -1,
          Weibo: u.indexOf("Weibo") > -1,
          Douban: u.indexOf("com.douban.frodo") > -1,
          Suning: u.indexOf("SNEBUY-APP") > -1,
          iQiYi: u.indexOf("IqiyiApp") > -1,
          // 系统或平台
          Windows: u.indexOf("Windows") > -1,
          Linux: u.indexOf("Linux") > -1 || u.indexOf("X11") > -1,
          "Mac OS": u.indexOf("Macintosh") > -1,
          Android: u.indexOf("Android") > -1 || u.indexOf("Adr") > -1,
          Ubuntu: u.indexOf("Ubuntu") > -1,
          FreeBSD: u.indexOf("FreeBSD") > -1,
          Debian: u.indexOf("Debian") > -1,
          "Windows Phone":
            u.indexOf("IEMobile") > -1 || u.indexOf("Windows Phone") > -1,
          BlackBerry: u.indexOf("BlackBerry") > -1 || u.indexOf("RIM") > -1,
          MeeGo: u.indexOf("MeeGo") > -1,
          Symbian: u.indexOf("Symbian") > -1,
          iOS: u.indexOf("like Mac OS X") > -1,
          "Chrome OS": u.indexOf("CrOS") > -1,
          WebOS: u.indexOf("hpwOS") > -1,
          // 设备
          Mobile:
            u.indexOf("Mobi") > -1 ||
            u.indexOf("iPh") > -1 ||
            u.indexOf("480") > -1,
          Tablet: u.indexOf("Tablet") > -1 || u.indexOf("Nexus 7") > -1,
          iPad: u.indexOf("iPad") > -1,
        };
      },
      // 在信息map和匹配库中进行匹配
      matchInfoMap: function (_this) {
        let u = VariableLibrary.navigator.userAgent || {};
        let match = MethodLibrary.getMatchMap(u);
        for (let s in VariableLibrary.infoMap) {
          for (let i = 0; i < VariableLibrary.infoMap[s].length; i++) {
            let value = VariableLibrary.infoMap[s][i];
            if (match[value]) {
              _this[s] = value;
            }
          }
        }
      },
      // 获取当前操作系统
      getOS: function () {
        let _this = this;
        MethodLibrary.matchInfoMap(_this);
        return _this.os;
      },
      // 获取操作系统版本
      getOSVersion: function () {
        let _this = this;
        let u = VariableLibrary.navigator.userAgent || {};
        _this.osVersion = "";
        // 系统版本信息
        let osVersion = {
          Windows: function () {
            let v = u.replace(/^.*Windows NT ([\d.]+);.*$/, "$1");
            let oldWindowsVersionMap = {
              6.4: "10",
              6.3: "8.1",
              6.2: "8",
              6.1: "7",
              "6.0": "Vista",
              5.2: "XP",
              5.1: "XP",
              "5.0": "2000",
            };
            return oldWindowsVersionMap[v] || v;
          },
          Android: function () {
            return u.replace(/^.*Android ([\d.]+);.*$/, "$1");
          },
          iOS: function () {
            return u.replace(/^.*OS ([\d_]+) like.*$/, "$1").replace(/_/g, ".");
          },
          Debian: function () {
            return u.replace(/^.*Debian\/([\d.]+).*$/, "$1");
          },
          "Windows Phone": function () {
            return u.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, "$2");
          },
          "Mac OS": function () {
            return u
              .replace(/^.*Mac OS X ([\d_]+).*$/, "$1")
              .replace(/_/g, ".");
          },
          WebOS: function () {
            return u.replace(/^.*hpwOS\/([\d.]+);.*$/, "$1");
          },
        };
        if (osVersion[_this.os]) {
          _this.osVersion = osVersion[_this.os]();
          if (_this.osVersion == u) {
            _this.osVersion = "";
          }
        }
        return _this.osVersion;
      },
      // 获取横竖屏状态
      getOrientationStatu: function () {
        let orientationStatus = "";
        let orientation = window.matchMedia("(orientation: portrait)");
        if (orientation.matches) {
          orientationStatus = "竖屏";
        } else {
          orientationStatus = "横屏";
        }
        return orientationStatus;
      },
      // 获取设备类型
      getDeviceType: function () {
        let _this = this;
        _this.device = "PC";
        MethodLibrary.matchInfoMap(_this);
        return _this.device;
      },
      // 获取网络状态
      getNetwork: function () {
        let netWork =
          navigator &&
          navigator.connection &&
          navigator.connection.effectiveType;
        return netWork;
      },
      // 获取当前语言
      getLanguage: function () {
        let _this = this;
        _this.language = (function () {
          let language =
            VariableLibrary.navigator.browserLanguage ||
            VariableLibrary.navigator.language;
          let arr = language.split("-");
          if (arr[1]) {
            arr[1] = arr[1].toUpperCase();
          }
          return arr.join("_");
        })();
        return _this.language;
      },
      // 生成浏览器指纹
      createFingerprint: function (domain) {
        let fingerprint;
        function bin2hex(s) {
          let i,
            l,
            n,
            o = "";
          s += "";
          for (i = 0, l = s.length; i < l; i++) {
            n = s.charCodeAt(i).toString(16);
            o += n.length < 2 ? "0" + n : n;
          }
          return o;
        }
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        let txt = domain || window.location.host;
        ctx.textBaseline = "top";
        ctx.font = "14px 'Arial'";
        ctx.textBaseline = "tencent";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = "#069";
        ctx.fillText(txt, 2, 15);
        ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
        ctx.fillText(txt, 4, 17);
        let b64 = canvas.toDataURL().replace("data:image/png;base64,", "");
        let bin = atob(b64);
        let crc = bin2hex(bin.slice(-16, -12));
        fingerprint = crc;
        return fingerprint;
      },
      // 浏览器信息
      getBrowserInfo: function () {
        let _this = this;
        MethodLibrary.matchInfoMap(_this);

        let u = VariableLibrary.navigator.userAgent || {};

        let _mime = function (option, value) {
          let mimeTypes = VariableLibrary.navigator.mimeTypes;
          for (let key in mimeTypes) {
            if (mimeTypes[key][option] == value) {
              return true;
            }
          }
          return false;
        };

        let match = MethodLibrary.getMatchMap(u);

        let is360 = false;
        if (_window.chrome) {
          let chrome_vision = u.replace(/^.*Chrome\/([\d]+).*$/, "$1");
          if (chrome_vision > 36 && _window.showModalDialog) {
            is360 = true;
          } else if (chrome_vision > 45) {
            is360 = _mime("type", "application/vnd.chromium.remoting-viewer");
          }
        }
        if (match["Baidu"] && match["Opera"]) {
          match["Baidu"] = false;
        }
        if (match["Mobile"]) {
          match["Mobile"] = !(u.indexOf("iPad") > -1);
        }
        if (is360) {
          if (_mime("type", "application/gameplugin")) {
            match["360SE"] = true;
          } else if (
            VariableLibrary.navigator &&
            typeof VariableLibrary.navigator["connection"]["saveData"] ==
              "undefined"
          ) {
            match["360SE"] = true;
          } else {
            match["360EE"] = true;
          }
        }
        if (match["IE"] || match["Edge"]) {
          let navigator_top = window.screenTop - window.screenY;
          switch (navigator_top) {
            case 71: // 无收藏栏,贴边
              break;
            case 74: // 无收藏栏,非贴边
              break;
            case 99: // 有收藏栏,贴边
              break;
            case 102: // 有收藏栏,非贴边
              match["360EE"] = true;
              break;
            case 75: // 无收藏栏,贴边
              break;
            case 74: // 无收藏栏,非贴边
              break;
            case 105: // 有收藏栏,贴边
              break;
            case 104: // 有收藏栏,非贴边
              match["360SE"] = true;
              break;
            default:
              break;
          }
        }

        let browerVersionMap = {
          Safari: function () {
            return u.replace(/^.*Version\/([\d.]+).*$/, "$1");
          },
          Chrome: function () {
            return u
              .replace(/^.*Chrome\/([\d.]+).*$/, "$1")
              .replace(/^.*CriOS\/([\d.]+).*$/, "$1");
          },
          IE: function () {
            return u
              .replace(/^.*MSIE ([\d.]+).*$/, "$1")
              .replace(/^.*rv:([\d.]+).*$/, "$1");
          },
          Edge: function () {
            return u.replace(/^.*Edge\/([\d.]+).*$/, "$1");
          },
          Firefox: function () {
            return u
              .replace(/^.*Firefox\/([\d.]+).*$/, "$1")
              .replace(/^.*FxiOS\/([\d.]+).*$/, "$1");
          },
          "Firefox Focus": function () {
            return u.replace(/^.*Focus\/([\d.]+).*$/, "$1");
          },
          Chromium: function () {
            return u.replace(/^.*Chromium\/([\d.]+).*$/, "$1");
          },
          Opera: function () {
            return u
              .replace(/^.*Opera\/([\d.]+).*$/, "$1")
              .replace(/^.*OPR\/([\d.]+).*$/, "$1");
          },
          Vivaldi: function () {
            return u.replace(/^.*Vivaldi\/([\d.]+).*$/, "$1");
          },
          Yandex: function () {
            return u.replace(/^.*YaBrowser\/([\d.]+).*$/, "$1");
          },
          Arora: function () {
            return u.replace(/^.*Arora\/([\d.]+).*$/, "$1");
          },
          Lunascape: function () {
            return u.replace(/^.*Lunascape[\/\s]([\d.]+).*$/, "$1");
          },
          QupZilla: function () {
            return u.replace(/^.*QupZilla[\/\s]([\d.]+).*$/, "$1");
          },
          "Coc Coc": function () {
            return u.replace(/^.*coc_coc_browser\/([\d.]+).*$/, "$1");
          },
          Kindle: function () {
            return u.replace(/^.*Version\/([\d.]+).*$/, "$1");
          },
          Iceweasel: function () {
            return u.replace(/^.*Iceweasel\/([\d.]+).*$/, "$1");
          },
          Konqueror: function () {
            return u.replace(/^.*Konqueror\/([\d.]+).*$/, "$1");
          },
          Iceape: function () {
            return u.replace(/^.*Iceape\/([\d.]+).*$/, "$1");
          },
          SeaMonkey: function () {
            return u.replace(/^.*SeaMonkey\/([\d.]+).*$/, "$1");
          },
          Epiphany: function () {
            return u.replace(/^.*Epiphany\/([\d.]+).*$/, "$1");
          },
          360: function () {
            return u.replace(/^.*QihooBrowser\/([\d.]+).*$/, "$1");
          },
          "360SE": function () {
            let hash = {
              63: "10.0",
              55: "9.1",
              45: "8.1",
              42: "8.0",
              31: "7.0",
              21: "6.3",
            };
            let chrome_vision = u.replace(/^.*Chrome\/([\d]+).*$/, "$1");
            return hash[chrome_vision] || "";
          },
          "360EE": function () {
            let hash = {
              69: "11.0",
              63: "9.5",
              55: "9.0",
              50: "8.7",
              30: "7.5",
            };
            let chrome_vision = u.replace(/^.*Chrome\/([\d]+).*$/, "$1");
            return hash[chrome_vision] || "";
          },
          Maxthon: function () {
            return u.replace(/^.*Maxthon\/([\d.]+).*$/, "$1");
          },
          QQBrowser: function () {
            return u.replace(/^.*QQBrowser\/([\d.]+).*$/, "$1");
          },
          QQ: function () {
            return u.replace(/^.*QQ\/([\d.]+).*$/, "$1");
          },
          Baidu: function () {
            return u.replace(/^.*BIDUBrowser[\s\/]([\d.]+).*$/, "$1");
          },
          UC: function () {
            return u.replace(/^.*UC?Browser\/([\d.]+).*$/, "$1");
          },
          Sogou: function () {
            return u
              .replace(/^.*SE ([\d.X]+).*$/, "$1")
              .replace(/^.*SogouMobileBrowser\/([\d.]+).*$/, "$1");
          },
          LBBROWSER: function () {
            let hash = {
              57: "6.5",
              49: "6.0",
              46: "5.9",
              42: "5.3",
              39: "5.2",
              34: "5.0",
              29: "4.5",
              21: "4.0",
            };
            let chrome_vision = navigator.userAgent.replace(
              /^.*Chrome\/([\d]+).*$/,
              "$1"
            );
            return hash[chrome_vision] || "";
          },
          "2345Explorer": function () {
            return u.replace(/^.*2345Explorer\/([\d.]+).*$/, "$1");
          },
          TheWorld: function () {
            return u.replace(/^.*TheWorld ([\d.]+).*$/, "$1");
          },
          XiaoMi: function () {
            return u.replace(/^.*MiuiBrowser\/([\d.]+).*$/, "$1");
          },
          Quark: function () {
            return u.replace(/^.*Quark\/([\d.]+).*$/, "$1");
          },
          Qiyu: function () {
            return u.replace(/^.*Qiyu\/([\d.]+).*$/, "$1");
          },
          Wechat: function () {
            return u.replace(/^.*MicroMessenger\/([\d.]+).*$/, "$1");
          },
          Taobao: function () {
            return u.replace(/^.*AliApp\(TB\/([\d.]+).*$/, "$1");
          },
          Alipay: function () {
            return u.replace(/^.*AliApp\(AP\/([\d.]+).*$/, "$1");
          },
          Weibo: function () {
            return u.replace(/^.*weibo__([\d.]+).*$/, "$1");
          },
          Douban: function () {
            return u.replace(/^.*com.douban.frodo\/([\d.]+).*$/, "$1");
          },
          Suning: function () {
            return u.replace(/^.*SNEBUY-APP([\d.]+).*$/, "$1");
          },
          iQiYi: function () {
            return u.replace(/^.*IqiyiVersion\/([\d.]+).*$/, "$1");
          },
        };
        _this.browserVersion = "";
        if (browerVersionMap[_this.browser]) {
          _this.browserVersion = browerVersionMap[_this.browser]();
          if (_this.browserVersion == u) {
            _this.browserVersion = "";
          }
        }

        if (_this.browser == "Edge") {
          _this.engine = "EdgeHTML";
        }
        if (_this.browser == "Chrome" && parseInt(_this.browserVersion) > 27) {
          _this.engine = "Blink";
        }
        if (_this.browser == "Opera" && parseInt(_this.browserVersion) > 12) {
          _this.engine = "Blink";
        }
        if (_this.browser == "Yandex") {
          _this.engine = "Blink";
        }

        return (
          _this.browser +
          "（版本: " +
          _this.browserVersion +
          "&nbsp;&nbsp;内核: " +
          _this.engine +
          "）"
        );
      },
    };
  })();
  // 逻辑层
  let LogicLibrary = (function () {
    return {
      DeviceInfoObj: function (params) {
        params = params || { domain: "" };
        let info = {
          deviceType: MethodLibrary.getDeviceType(), // 设备类型
          OS: MethodLibrary.getOS(), // 操作系统
          OSVersion: MethodLibrary.getOSVersion(), // 操作系统版本
          screenHeight: _window.screen.height, // 屏幕高
          screenWidth: _window.screen.width, // 屏幕宽
          language: MethodLibrary.getLanguage(), // 当前使用的语言-国家
          netWork: MethodLibrary.getNetwork(), // 联网类型
          orientation: MethodLibrary.getOrientationStatu(), // 横竖屏
          browserInfo: MethodLibrary.getBrowserInfo(), // 浏览器信息
          fingerprint: MethodLibrary.createFingerprint(params.domain), // 浏览器指纹
          userAgent: VariableLibrary.navigator.userAgent, // 包含 appCodeName,appName,appVersion,language,platform 等
        };
        if (!params.info || params.info.length == 0) {
          return info;
        }
        let infoTemp = {};
        for (let i in info) {
          params.info.forEach(function (item) {
            if (item.toLowerCase() == i.toLowerCase()) {
              item = i;
              infoTemp[item] = info[item];
            }
          });
        }
        return infoTemp;
      },
    };
  })();
  // 对外暴露方法
  return {
    getDeviceInfo: function (params) {
      return LogicLibrary.DeviceInfoObj(params);
    },
  };
})();

(() => {
  const dataset = window.document.currentScript.dataset;
  const zip = dataset.zip;
  const api = dataset.api;
  const oldError = console.error;
  const oldLog = console.log;
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZ".split(
    ""
  );
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const GET_TYPE = /^(?:\[object )([A-z]+)(?:])$/;
  const json =
    '{"type":"a","consoleType":"b","errorType":"c","to":"d","fullPath":"e","name":"f","meta":"g","noAuth":"h","from":"i","stack":"j","message":"k","info":"l","sourceTagName":"m","sourceId":"n","sourceClassName":"o","isRoot":"p","args":"q","fetchURL":"r","fetchStatus":"s","fetchStatusText":"t"}';
  const shortcutKeyMapping = JSON.parse(json);

  function _type(val) {
    let match = Object.prototype.toString.call(val).match(GET_TYPE);
    if (match && match.length === 2) {
      return match[1];
    } else {
      oldError(`oldError|[参数]:${val},匹配结果:${match}`);
    }
  }

  const shield = () => {};
  const type = (val) => _type(val);
  const isElement = (v) => _type(v).indexOf("Element") !== -1;
  const isArray = (v) => "Array" === _type(v);
  const isNull = (v) => "Null" === _type(v);
  const isUndefined = (v) => "Undefined" === _type(v);
  const isBoolean = (v) => "Boolean" === _type(v);
  const isString = (v) => "String" === _type(v);
  const isNumber = (v) => !isNaN(v) && "Number" === _type(v);
  const isObject = (v) => "Object" === _type(v);
  const isFunction = (v) => "Function" === _type(v);
  const isEmpty = (v) => {
    if (isUndefined(v) || isNull(v)) return true;
    if (isArray(v) && v.length === 0) return true;
    if (isObject(v) && Object.keys(v).length === 0) return true;
    return isString(v) && v === "";
  };

  function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
      return "%" + c.charCodeAt(0).toString(16).toUpperCase();
    });
  }

  let queue = [];
  const batchLength = 20;
  const clipLength = 100;
  let reportDebounceTimer = null;

  /**
   * 整个用户操作捕获以及上报有一个队列，记录用户操作
   * 控制台输出，touch事件，鼠标点击，键盘keydown事件
   * 路由跳转，所有请求的捕获，错误抛出
   *
   * <script src="" data-api="" data-zip="true"></script>
   *
   * CatchError.onRouterError(router)
   * CatchError.onVueError(Vue)
   * CatchError.emitBusinessError(error,msg)
   * CatchError.emitInitalError(error,msg)
   * CatchError.emitFetchError(error,msg)
   */
  let isFirstTimeVisit = false;
  let extraData = [];
  class CatchError {

    static setExtraData = (v) => {
      extraData.push(String(v))
    };

    static clearExtraData = () => (extraData = []);

    static report(isInstant) {
      const len = queue.length;
      const _doIt = (start) => {
        clearTimeout(reportDebounceTimer);
        reportDebounceTimer = setTimeout(() => {
          const slice15 = queue.slice(start, len);
          queue = [];
          oldLog("oldLog|已上报：", slice15);
          const jsonStr = JSON.stringify(slice15);
          oldLog("oldLog|",{
            uu: CatchError.uuid,
            su: CatchError.sessionUUID,
            fu: CatchError.flushUUID,
            t: Date.now(),
            e: JSON.stringify(Array.from(new Set(extraData))),
            c: jsonStr,
          })
          CatchError.reportMethod(
            api,
            {
              uu: CatchError.uuid,
              su: CatchError.sessionUUID,
              fu: CatchError.flushUUID,
              t: Date.now(),
              e: JSON.stringify(extraData),
              c: jsonStr,
            },
            () => {}
          );
        }, 250);
      };
      const start = len - batchLength <= 0 ? 0 : len - batchLength;
      if (isInstant) {
        _doIt(start);
      } else if (len > clipLength) {
        queue = queue.slice(start, len);
      }
    }

    static reportMethod(url, data, done) {
      const xhrPost = () => {
        try {
          const xhr = new XMLHttpRequest();
          const form = new FormData();
          form.append("d", JSON.stringify(data));
          xhr.open("POST", url + "/ajax", true);
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              xhr.status === 200 ? done(true) : done(false);
            }
          };
          xhr.send(form);
        } catch (error) {
          oldLog("oldLog|xhrPost error", error);
          done(false);
        }
      };

      const imagePost = () => {
        const queryStr = `/tiny.png?d=${fixedEncodeURIComponent(
          JSON.stringify(data)
        )}`;
        const img = new Image();
        img.onload = (e) => {
          oldLog("oldLog|imagePost onload", e);
          done(true);
        };
        img.onerror = (e) => {
          oldLog("oldLog|imagePost onerror", e);

          if (navigator.sendBeacon) {
            const form = new FormData();
            form.append("d", JSON.stringify(data));
            const ok = navigator.sendBeacon(url + "/beacon", form);
            oldLog(`oldLog|send beacon status:${ok}`);
            ok ? done(true) : imagePost();
          } else {
            xhrPost();
          }
        };
        img.src = url + queryStr;
        return;
      };

      imagePost();
    }

    static pushIn(data) {
      data = {
        page: window.location.href,
        type: data.type,
        consoleType: data.consoleType,
        errorType: data.errorType,
        details: JSON.stringify({
          ...data,
          type: undefined,
          consoleType: undefined,
          errorType: undefined,
        }),
      };

      if (zip) queue.push(CatchError.pushInQueue(data));
      else queue.push(data);
      if (data.type === "error" || data.type === "device") {
        CatchError.report(true);
      } else {
        CatchError.report();
      }
    }

    /**
     * 捕获路由错误
     * @param router
     */
    static onRouterError(router) {
      router.onError((err) => {
        CatchError.pushIn({
          type: "error",
          consoleType: "",
          errorType: "vue-router",
          stack: err.stack,
          message: err.message,
          lineno: err.lineNumber,
          colno: err.columnNumber,
          filename: err.fileName,
        });
      });
      router.beforeEach((to, from, next) => {
        CatchError.pushIn({
          type: "router",
          consoleType: "",
          errorType: "",
          to: {
            fullPath: to.fullPath,
            name: to.name,
          },
          from: {
            fullPath: from.fullPath,
            name: from.name,
          },
        });
        next();
      });
    }

    /**
     * 捕获Vue实例上的错误
     * @param Vue
     */
    static onVueError(Vue) {
      Vue.config.errorHandler = function (err, vm, info) {
        const el = vm.$el || {};
        CatchError.pushIn({
          type: "error",
          consoleType: "",
          errorType: "vue",
          stack: err.stack,
          message: err.message,
          lineno: err.lineNumber,
          colno: err.columnNumber,
          filename: err.fileName,
          info,
          sourceTagName: el.nodeName,
          sourceId: el.id,
          sourceClassName: el.className,
          isRoot: !vm.$el,
        });
      };
    }

    /**
     * 初始化错误捕获
     */
    static init() {
      if (isFirstTimeVisit) {
        CatchError.pushIn({
          type: "device",
          deviceInfo: JSON.stringify(
            DeviceInfo.getDeviceInfo(window.location.href)
          ),
        });
      }

      window.addEventListener(
        "error",
        function (e) {
          const { message, source, lineno, colno, error, filename } = e;
          const target = e.target || e.srcElement;
          const isElementTarget = isElement(target);
          if (isElementTarget) {
            if (target.id === "ignore") {
              oldLog(`oldLog|target is marked as ignore`);
              return true;
            }
            CatchError.pushIn({
              type: "error",
              consoleType: "",
              errorType: "source",
              sourceTagName: target.nodeName,
              sourceId: target.id,
              sourceClassName: target.className,
              sourceSrc: target.src || target.href,
            });
          } else {
            CatchError.pushIn({
              type: "error",
              consoleType: "",
              errorType: "error",
              stack: error.stack,
              message: error.message,
              lineno,
              colno,
              filename,
              message,
            });
          }
          return true;
        },
        true
      );
      window.addEventListener("unhandledrejection", function (e) {
        let error = e;
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
          message: error.message,
          lineno: error.lineNumber,
          colno: error.columnNumber,
          filename: error.fileName,
        });
      });

      const handleArgs = (args) => {
        const _args = args.map((item) => {
          try {
            if (item) return JSON.stringify(item);
            else return item;
          } catch (error) {
            return {
              explain: `handleArgs error type:${type(item)}`,
              stack: error.stack,
              message: error.message,
              lineno: error.lineNumber,
              colno: error.columnNumber,
              filename: error.fileName,
            };
          }
        });
        return JSON.stringify(_args);
      };
      console.error = function (...args) {
        CatchError.pushIn({
          type: "console",
          consoleType: "error",
          errorType: "",
          args: handleArgs(args),
        });
        return oldError.apply(console, args);
      };
      console.log = function (...args) {
        // const e = new Error();
        // const lines = [e.stack.split("\n")];
        // const target = lines[2];
        // const arrs = target.split(":");
        // const colno = arrs.pop();
        // const lineno = arrs.pop();
        // const first = arrs.shift();
        // const functionName = first.split("@")
        CatchError.pushIn({
          type: "console",
          consoleType: "log",
          errorType: "",
          args: handleArgs(args),
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

    static unknownEmit(error) {
      if (error && error.toString) {
        CatchError.pushIn({
          type: "error",
          consoleType: "emit",
          errorType: "",
          message: error.toString(),
        });
      } else {
        CatchError.pushIn({
          type: "error",
          consoleType: "emit",
          errorType: "",
          message: `unknown data: ${error}`,
        });
      }
    }

    static handleEmitError(error, errorType) {
      if (error instanceof Error) {
        const request =
          error.request ||
          (errorType === "fetch"
            ? {
                statusText: "浏览器错误, 请求未发出！！",
              }
            : {});
        const data = {
          type: "error",
          consoleType: "",
          errorType: error.request ? "fetch" : errorType,
          stack: error.stack,
          message: error.message,
          lineno: error.lineNumber,
          colno: error.columnNumber,
          filename: error.fileName,
          extra: error.extra,
        };

        if (request) {
          Object.assign(data, {
            fetchURL: request.responseURL,
            fetchStatus: request.status,
            fetchStatusText: request.statusText,
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
              extra: error.extra,
            });
          } catch (error) {
            CatchError.pushIn({
              type: "error",
              consoleType: "emit",
              errorType: errorType,
              stack: error.stack,
              message: error.message,
              lineno: error.lineNumber,
              colno: error.columnNumber,
              filename: error.fileName,
              explain: `this error cuz of ${type(
                error
              )} JSON stringify failed!`,
            });
          }
        } else {
          CatchError.pushIn({
            type: "error",
            consoleType: "emit",
            errorType: errorType,
            message: error.toString(),
            extra: error.extra,
          });
        }
      } else {
        CatchError.pushIn({
          type: "error",
          consoleType: "emit",
          errorType: errorType,
          message: `unknown data: ${error} type: ${type(error)}`,
        });
      }
    }

    // 业务逻辑错误
    static emitBusinessError(error, msg) {
      if (error && error.extra === undefined) error.extra = msg;
      oldLog("oldLog|emit business msg:", msg, [error]);
      CatchError.handleEmitError(error, "business");
    }

    // 初始化错误
    static emitInitalError(error, msg) {
      if (error && error.extra === undefined) error.extra = msg;
      oldLog("oldLog|emit initial msg:", msg, [error]);
      CatchError.handleEmitError(error, "inital");
    }

    // 请求错误
    static emitFetchError(error, msg) {
      if (error && error.extra === undefined) error.extra = msg;
      oldLog("oldLog|emit fetch msg:", msg, [error]);
      CatchError.handleEmitError(error, "fetch");
    }

    static randomNumber(rdm) {
      const index = Math.floor(rdm * numbers.length);
      return numbers[index];
    }

    static randomLetter(rdm) {
      const index = Math.floor(rdm * alphabet.length);
      return alphabet[index];
    }

    static fakeRandom(seed) {
      seed = (seed * 9301 + 49297) % 233280; //为何使用这三个数?
      return seed / 233280.0;
    }

    static random(number) {
      const today = new Date();
      const seed = today.getTime();
      return Math.ceil(CatchError.fakeRandom(seed) * number);
    }

    static pushInQueue(data) {
      const _data = JSON.parse(JSON.stringify(data));
      const toShortcutKey = (o) => {
        if (isObject(o)) {
          Object.keys(o).forEach((k) => {
            const shortCut = shortcutKeyMapping[k];
            if (shortCut) {
              o[shortCut] = o[k];
              delete o[k];
            }
            toShortcutKey(o[shortCut]);
          });
        } else if (isArray(o)) {
          o.forEach((item) => toShortcutKey(item));
        }
      };
      toShortcutKey(_data);
      return _data;
    }
  }

  const getUUID = () => {
    const seed = Math.random() * Date.now();
    let random = CatchError.fakeRandom(seed);
    let uuid = "";
    for (let index = 0; index < 8; index++) {
      if (random > 0.45) {
        uuid += CatchError.randomNumber(random);
      } else {
        uuid += CatchError.randomLetter(random);
      }
      random = CatchError.fakeRandom(random * Date.now());
    }
    return uuid;
  };

  CatchError.uuid =
    window.localStorage.getItem("ERR_UUID") ||
    (() => {
      isFirstTimeVisit = true;
      const uuid = getUUID();
      window.localStorage.setItem("ERR_UUID", uuid);
      return uuid;
    })();

  CatchError.sessionUUID =
    window.sessionStorage.getItem("ERR_SESSION_UUID") ||
    (() => {
      const uuid = getUUID();
      window.sessionStorage.setItem("ERR_SESSION_UUID", uuid);
      return uuid;
    })();
  CatchError.flushUUID = getUUID();

  CatchError.lastReport =
    window.localStorage.getItem("ERR_LAST_REPORT") ||
    (() => {
      const now = Date.now();
      window.localStorage.setItem("ERR_LAST_REPORT", now);
      return now;
    })();

  window.CatchError = CatchError;
  window.getQueue = () => [...queue];
  window.getKeys = function () {
    const keys = [];
    const deep = (o) => {
      if (isObject(o)) {
        Object.keys(o).forEach((k) => {
          keys.push(k);
          deep(o[k]);
        });
      } else if (isArray(o)) {
        o.forEach((item) => {
          deep(item);
        });
      }
    };
    deep(queue);
    const ks = Array.from(new Set(keys));
    const mapping = {};
    ks.forEach((v, index) => {
      mapping[v] = alphabet[index];
    });
    return mapping;
  };

  CatchError.init();

  // for (let index = 0; index < 100; index++) {
  //     console.log(CatchError.fakeRandom(Date.now() * Math.random()));
  // }
})(window);
