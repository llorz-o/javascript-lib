"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 设备信息收集
var DeviceInfo = function () {
  var root = typeof self !== "undefined" ? self : this;

  var _window = root || {}; // 变量库


  var VariableLibrary = {
    navigator: typeof root.navigator != "undefined" ? root.navigator : {},
    // 信息map
    infoMap: {
      engine: ["WebKit", "Trident", "Gecko", "Presto"],
      browser: ["Safari", "Chrome", "Edge", "IE", "Firefox", "Firefox Focus", "Chromium", "Opera", "Vivaldi", "Yandex", "Arora", "Lunascape", "QupZilla", "Coc Coc", "Kindle", "Iceweasel", "Konqueror", "Iceape", "SeaMonkey", "Epiphany", "360", "360SE", "360EE", "UC", "QQBrowser", "QQ", "Baidu", "Maxthon", "Sogou", "LBBROWSER", "2345Explorer", "TheWorld", "XiaoMi", "Quark", "Qiyu", "Wechat", "Taobao", "Alipay", "Weibo", "Douban", "Suning", "iQiYi"],
      os: ["Windows", "Linux", "Mac OS", "Android", "Ubuntu", "FreeBSD", "Debian", "iOS", "Windows Phone", "BlackBerry", "MeeGo", "Symbian", "Chrome OS", "WebOS"],
      device: ["Mobile", "Tablet", "iPad"]
    }
  }; // 方法库

  var MethodLibrary = function () {
    return {
      // 获取匹配库
      getMatchMap: function getMatchMap(u) {
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
          "Windows Phone": u.indexOf("IEMobile") > -1 || u.indexOf("Windows Phone") > -1,
          BlackBerry: u.indexOf("BlackBerry") > -1 || u.indexOf("RIM") > -1,
          MeeGo: u.indexOf("MeeGo") > -1,
          Symbian: u.indexOf("Symbian") > -1,
          iOS: u.indexOf("like Mac OS X") > -1,
          "Chrome OS": u.indexOf("CrOS") > -1,
          WebOS: u.indexOf("hpwOS") > -1,
          // 设备
          Mobile: u.indexOf("Mobi") > -1 || u.indexOf("iPh") > -1 || u.indexOf("480") > -1,
          Tablet: u.indexOf("Tablet") > -1 || u.indexOf("Nexus 7") > -1,
          iPad: u.indexOf("iPad") > -1
        };
      },
      // 在信息map和匹配库中进行匹配
      matchInfoMap: function matchInfoMap(_this) {
        var u = VariableLibrary.navigator.userAgent || {};
        var match = MethodLibrary.getMatchMap(u);

        for (var s in VariableLibrary.infoMap) {
          for (var i = 0; i < VariableLibrary.infoMap[s].length; i++) {
            var value = VariableLibrary.infoMap[s][i];

            if (match[value]) {
              _this[s] = value;
            }
          }
        }
      },
      // 获取当前操作系统
      getOS: function getOS() {
        var _this = this;

        MethodLibrary.matchInfoMap(_this);
        return _this.os;
      },
      // 获取操作系统版本
      getOSVersion: function getOSVersion() {
        var _this = this;

        var u = VariableLibrary.navigator.userAgent || {};
        _this.osVersion = ""; // 系统版本信息

        var osVersion = {
          Windows: function Windows() {
            var v = u.replace(/^.*Windows NT ([\d.]+);.*$/, "$1");
            var oldWindowsVersionMap = {
              6.4: "10",
              6.3: "8.1",
              6.2: "8",
              6.1: "7",
              "6.0": "Vista",
              5.2: "XP",
              5.1: "XP",
              "5.0": "2000"
            };
            return oldWindowsVersionMap[v] || v;
          },
          Android: function Android() {
            return u.replace(/^.*Android ([\d.]+);.*$/, "$1");
          },
          iOS: function iOS() {
            return u.replace(/^.*OS ([\d_]+) like.*$/, "$1").replace(/_/g, ".");
          },
          Debian: function Debian() {
            return u.replace(/^.*Debian\/([\d.]+).*$/, "$1");
          },
          "Windows Phone": function WindowsPhone() {
            return u.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, "$2");
          },
          "Mac OS": function MacOS() {
            return u.replace(/^.*Mac OS X ([\d_]+).*$/, "$1").replace(/_/g, ".");
          },
          WebOS: function WebOS() {
            return u.replace(/^.*hpwOS\/([\d.]+);.*$/, "$1");
          }
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
      getOrientationStatu: function getOrientationStatu() {
        var orientationStatus = "";
        var orientation = window.matchMedia("(orientation: portrait)");

        if (orientation.matches) {
          orientationStatus = "竖屏";
        } else {
          orientationStatus = "横屏";
        }

        return orientationStatus;
      },
      // 获取设备类型
      getDeviceType: function getDeviceType() {
        var _this = this;

        _this.device = "PC";
        MethodLibrary.matchInfoMap(_this);
        return _this.device;
      },
      // 获取网络状态
      getNetwork: function getNetwork() {
        var netWork = navigator && navigator.connection && navigator.connection.effectiveType;
        return netWork;
      },
      // 获取当前语言
      getLanguage: function getLanguage() {
        var _this = this;

        _this.language = function () {
          var language = VariableLibrary.navigator.browserLanguage || VariableLibrary.navigator.language;
          var arr = language.split("-");

          if (arr[1]) {
            arr[1] = arr[1].toUpperCase();
          }

          return arr.join("_");
        }();

        return _this.language;
      },
      // 生成浏览器指纹
      createFingerprint: function createFingerprint(domain) {
        var fingerprint;

        function bin2hex(s) {
          var i,
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

        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var txt = domain || window.location.host;
        ctx.textBaseline = "top";
        ctx.font = "14px 'Arial'";
        ctx.textBaseline = "tencent";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = "#069";
        ctx.fillText(txt, 2, 15);
        ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
        ctx.fillText(txt, 4, 17);
        var b64 = canvas.toDataURL().replace("data:image/png;base64,", "");
        var bin = atob(b64);
        var crc = bin2hex(bin.slice(-16, -12));
        fingerprint = crc;
        return fingerprint;
      },
      // 浏览器信息
      getBrowserInfo: function getBrowserInfo() {
        var _this = this;

        MethodLibrary.matchInfoMap(_this);
        var u = VariableLibrary.navigator.userAgent || {};

        var _mime = function _mime(option, value) {
          var mimeTypes = VariableLibrary.navigator.mimeTypes;

          for (var key in mimeTypes) {
            if (mimeTypes[key][option] == value) {
              return true;
            }
          }

          return false;
        };

        var match = MethodLibrary.getMatchMap(u);
        var is360 = false;

        if (_window.chrome) {
          var chrome_vision = u.replace(/^.*Chrome\/([\d]+).*$/, "$1");

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
          } else if (VariableLibrary.navigator && typeof VariableLibrary.navigator["connection"]["saveData"] == "undefined") {
            match["360SE"] = true;
          } else {
            match["360EE"] = true;
          }
        }

        if (match["IE"] || match["Edge"]) {
          var navigator_top = window.screenTop - window.screenY;

          switch (navigator_top) {
            case 71:
              // 无收藏栏,贴边
              break;

            case 74:
              // 无收藏栏,非贴边
              break;

            case 99:
              // 有收藏栏,贴边
              break;

            case 102:
              // 有收藏栏,非贴边
              match["360EE"] = true;
              break;

            case 75:
              // 无收藏栏,贴边
              break;

            case 74:
              // 无收藏栏,非贴边
              break;

            case 105:
              // 有收藏栏,贴边
              break;

            case 104:
              // 有收藏栏,非贴边
              match["360SE"] = true;
              break;

            default:
              break;
          }
        }

        var browerVersionMap = {
          Safari: function Safari() {
            return u.replace(/^.*Version\/([\d.]+).*$/, "$1");
          },
          Chrome: function Chrome() {
            return u.replace(/^.*Chrome\/([\d.]+).*$/, "$1").replace(/^.*CriOS\/([\d.]+).*$/, "$1");
          },
          IE: function IE() {
            return u.replace(/^.*MSIE ([\d.]+).*$/, "$1").replace(/^.*rv:([\d.]+).*$/, "$1");
          },
          Edge: function Edge() {
            return u.replace(/^.*Edge\/([\d.]+).*$/, "$1");
          },
          Firefox: function Firefox() {
            return u.replace(/^.*Firefox\/([\d.]+).*$/, "$1").replace(/^.*FxiOS\/([\d.]+).*$/, "$1");
          },
          "Firefox Focus": function FirefoxFocus() {
            return u.replace(/^.*Focus\/([\d.]+).*$/, "$1");
          },
          Chromium: function Chromium() {
            return u.replace(/^.*Chromium\/([\d.]+).*$/, "$1");
          },
          Opera: function Opera() {
            return u.replace(/^.*Opera\/([\d.]+).*$/, "$1").replace(/^.*OPR\/([\d.]+).*$/, "$1");
          },
          Vivaldi: function Vivaldi() {
            return u.replace(/^.*Vivaldi\/([\d.]+).*$/, "$1");
          },
          Yandex: function Yandex() {
            return u.replace(/^.*YaBrowser\/([\d.]+).*$/, "$1");
          },
          Arora: function Arora() {
            return u.replace(/^.*Arora\/([\d.]+).*$/, "$1");
          },
          Lunascape: function Lunascape() {
            return u.replace(/^.*Lunascape[\/\s]([\d.]+).*$/, "$1");
          },
          QupZilla: function QupZilla() {
            return u.replace(/^.*QupZilla[\/\s]([\d.]+).*$/, "$1");
          },
          "Coc Coc": function CocCoc() {
            return u.replace(/^.*coc_coc_browser\/([\d.]+).*$/, "$1");
          },
          Kindle: function Kindle() {
            return u.replace(/^.*Version\/([\d.]+).*$/, "$1");
          },
          Iceweasel: function Iceweasel() {
            return u.replace(/^.*Iceweasel\/([\d.]+).*$/, "$1");
          },
          Konqueror: function Konqueror() {
            return u.replace(/^.*Konqueror\/([\d.]+).*$/, "$1");
          },
          Iceape: function Iceape() {
            return u.replace(/^.*Iceape\/([\d.]+).*$/, "$1");
          },
          SeaMonkey: function SeaMonkey() {
            return u.replace(/^.*SeaMonkey\/([\d.]+).*$/, "$1");
          },
          Epiphany: function Epiphany() {
            return u.replace(/^.*Epiphany\/([\d.]+).*$/, "$1");
          },
          360: function _() {
            return u.replace(/^.*QihooBrowser\/([\d.]+).*$/, "$1");
          },
          "360SE": function SE() {
            var hash = {
              63: "10.0",
              55: "9.1",
              45: "8.1",
              42: "8.0",
              31: "7.0",
              21: "6.3"
            };
            var chrome_vision = u.replace(/^.*Chrome\/([\d]+).*$/, "$1");
            return hash[chrome_vision] || "";
          },
          "360EE": function EE() {
            var hash = {
              69: "11.0",
              63: "9.5",
              55: "9.0",
              50: "8.7",
              30: "7.5"
            };
            var chrome_vision = u.replace(/^.*Chrome\/([\d]+).*$/, "$1");
            return hash[chrome_vision] || "";
          },
          Maxthon: function Maxthon() {
            return u.replace(/^.*Maxthon\/([\d.]+).*$/, "$1");
          },
          QQBrowser: function QQBrowser() {
            return u.replace(/^.*QQBrowser\/([\d.]+).*$/, "$1");
          },
          QQ: function QQ() {
            return u.replace(/^.*QQ\/([\d.]+).*$/, "$1");
          },
          Baidu: function Baidu() {
            return u.replace(/^.*BIDUBrowser[\s\/]([\d.]+).*$/, "$1");
          },
          UC: function UC() {
            return u.replace(/^.*UC?Browser\/([\d.]+).*$/, "$1");
          },
          Sogou: function Sogou() {
            return u.replace(/^.*SE ([\d.X]+).*$/, "$1").replace(/^.*SogouMobileBrowser\/([\d.]+).*$/, "$1");
          },
          LBBROWSER: function LBBROWSER() {
            var hash = {
              57: "6.5",
              49: "6.0",
              46: "5.9",
              42: "5.3",
              39: "5.2",
              34: "5.0",
              29: "4.5",
              21: "4.0"
            };
            var chrome_vision = navigator.userAgent.replace(/^.*Chrome\/([\d]+).*$/, "$1");
            return hash[chrome_vision] || "";
          },
          "2345Explorer": function Explorer() {
            return u.replace(/^.*2345Explorer\/([\d.]+).*$/, "$1");
          },
          TheWorld: function TheWorld() {
            return u.replace(/^.*TheWorld ([\d.]+).*$/, "$1");
          },
          XiaoMi: function XiaoMi() {
            return u.replace(/^.*MiuiBrowser\/([\d.]+).*$/, "$1");
          },
          Quark: function Quark() {
            return u.replace(/^.*Quark\/([\d.]+).*$/, "$1");
          },
          Qiyu: function Qiyu() {
            return u.replace(/^.*Qiyu\/([\d.]+).*$/, "$1");
          },
          Wechat: function Wechat() {
            return u.replace(/^.*MicroMessenger\/([\d.]+).*$/, "$1");
          },
          Taobao: function Taobao() {
            return u.replace(/^.*AliApp\(TB\/([\d.]+).*$/, "$1");
          },
          Alipay: function Alipay() {
            return u.replace(/^.*AliApp\(AP\/([\d.]+).*$/, "$1");
          },
          Weibo: function Weibo() {
            return u.replace(/^.*weibo__([\d.]+).*$/, "$1");
          },
          Douban: function Douban() {
            return u.replace(/^.*com.douban.frodo\/([\d.]+).*$/, "$1");
          },
          Suning: function Suning() {
            return u.replace(/^.*SNEBUY-APP([\d.]+).*$/, "$1");
          },
          iQiYi: function iQiYi() {
            return u.replace(/^.*IqiyiVersion\/([\d.]+).*$/, "$1");
          }
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

        return _this.browser + "（版本: " + _this.browserVersion + "&nbsp;&nbsp;内核: " + _this.engine + "）";
      }
    };
  }(); // 逻辑层


  var LogicLibrary = function () {
    return {
      DeviceInfoObj: function DeviceInfoObj(params) {
        params = params || {
          domain: ""
        };
        var info = {
          deviceType: MethodLibrary.getDeviceType(),
          // 设备类型
          OS: MethodLibrary.getOS(),
          // 操作系统
          OSVersion: MethodLibrary.getOSVersion(),
          // 操作系统版本
          screenHeight: _window.screen.height,
          // 屏幕高
          screenWidth: _window.screen.width,
          // 屏幕宽
          language: MethodLibrary.getLanguage(),
          // 当前使用的语言-国家
          netWork: MethodLibrary.getNetwork(),
          // 联网类型
          orientation: MethodLibrary.getOrientationStatu(),
          // 横竖屏
          browserInfo: MethodLibrary.getBrowserInfo(),
          // 浏览器信息
          fingerprint: MethodLibrary.createFingerprint(params.domain),
          // 浏览器指纹
          userAgent: VariableLibrary.navigator.userAgent // 包含 appCodeName,appName,appVersion,language,platform 等

        };

        if (!params.info || params.info.length == 0) {
          return info;
        }

        var infoTemp = {};

        var _loop = function _loop(i) {
          params.info.forEach(function (item) {
            if (item.toLowerCase() == i.toLowerCase()) {
              item = i;
              infoTemp[item] = info[item];
            }
          });
        };

        for (var i in info) {
          _loop(i);
        }

        return infoTemp;
      }
    };
  }(); // 对外暴露方法


  return {
    getDeviceInfo: function getDeviceInfo(params) {
      return LogicLibrary.DeviceInfoObj(params);
    }
  };
}();

(function () {
  var dataset = window.document.currentScript.dataset;
  var zip = dataset.zip;
  var api = dataset.api;
  var oldError = console.error;
  var oldLog = console.log;
  var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZ".split("");
  var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var GET_TYPE = /^(?:\[object )([A-z]+)(?:])$/;
  var json = '{"type":"a","consoleType":"b","errorType":"c","to":"d","fullPath":"e","name":"f","meta":"g","noAuth":"h","from":"i","stack":"j","message":"k","info":"l","sourceTagName":"m","sourceId":"n","sourceClassName":"o","isRoot":"p","args":"q","fetchURL":"r","fetchStatus":"s","fetchStatusText":"t"}';
  var shortcutKeyMapping = JSON.parse(json);

  function _type(val) {
    var match = Object.prototype.toString.call(val).match(GET_TYPE);

    if (match && match.length === 2) {
      return match[1];
    } else {
      oldError("oldError|[\u53C2\u6570]:".concat(val, ",\u5339\u914D\u7ED3\u679C:").concat(match));
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
      return "%" + c.charCodeAt(0).toString(16).toUpperCase();
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
   *
   * <script src="" data-api="" data-zip="true"></script>
   *
   * CatchError.onRouterError(router)
   * CatchError.onVueError(Vue)
   * CatchError.emitBusinessError(error,msg)
   * CatchError.emitInitalError(error,msg)
   * CatchError.emitFetchError(error,msg)
   */

  var isFirstTimeVisit = false;
  var extraData = [];

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
            oldLog("oldLog|已上报：", slice15);
            var jsonStr = JSON.stringify(slice15);
            CatchError.reportMethod(api, {
              uu: CatchError.uuid,
              su: CatchError.sessionUUID,
              fu: CatchError.flushUUID,
              t: Date.now(),
              e: JSON.stringify(Array.from(new Set(extraData))),
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
            xhr.open("POST", url + "/ajax", true);

            xhr.onreadystatechange = function () {
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

        var imagePost = function imagePost() {
          var queryStr = "/tiny.png?d=".concat(fixedEncodeURIComponent(JSON.stringify(data)));
          var img = new Image();

          img.onload = function (e) {
            oldLog("oldLog|imagePost onload", e);
            done(true);
          };

          img.onerror = function (e) {
            oldLog("oldLog|imagePost onerror", e);

            if (navigator.sendBeacon) {
              var form = new FormData();
              form.append("d", JSON.stringify(data));
              var ok = navigator.sendBeacon(url + "/beacon", form);
              oldLog("oldLog|send beacon status:".concat(ok));
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
    }, {
      key: "pushIn",
      value: function pushIn(data) {
        data = {
          page: window.location.href,
          type: data.type,
          consoleType: data.consoleType,
          errorType: data.errorType,
          details: JSON.stringify(_objectSpread(_objectSpread({}, data), {}, {
            type: undefined,
            consoleType: undefined,
            errorType: undefined
          }))
        };
        if (zip) queue.push(CatchError.pushInQueue(data));else queue.push(data);

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

    }, {
      key: "onRouterError",
      value: function onRouterError(router) {
        router.onError(function (err) {
          CatchError.pushIn({
            type: "error",
            consoleType: "",
            errorType: "vue-router",
            stack: err.stack,
            message: err.message,
            lineno: err.lineNumber,
            colno: err.columnNumber,
            filename: err.fileName
          });
        });
        router.beforeEach(function (to, from, next) {
          CatchError.pushIn({
            type: "router",
            consoleType: "",
            errorType: "",
            to: {
              fullPath: to.fullPath,
              name: to.name
            },
            from: {
              fullPath: from.fullPath,
              name: from.name
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
            lineno: err.lineNumber,
            colno: err.columnNumber,
            filename: err.fileName,
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
        if (isFirstTimeVisit) {
          CatchError.pushIn({
            type: "device",
            deviceInfo: JSON.stringify(DeviceInfo.getDeviceInfo(window.location.href))
          });
        }

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
              oldLog("oldLog|target is marked as ignore");
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
            message: error.message,
            lineno: error.lineNumber,
            colno: error.columnNumber,
            filename: error.fileName
          });
        });

        var handleArgs = function handleArgs(args) {
          var _args = args.map(function (item) {
            try {
              if (item) return JSON.stringify(item);else return item;
            } catch (error) {
              return {
                explain: "handleArgs error type:".concat(type(item)),
                stack: error.stack,
                message: error.message,
                lineno: error.lineNumber,
                colno: error.columnNumber,
                filename: error.fileName
              };
            }
          });

          return JSON.stringify(_args);
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
          var request = error.request || (errorType === "fetch" ? {
            statusText: "浏览器错误, 请求未发出！！"
          } : {});
          var data = {
            type: "error",
            consoleType: "",
            errorType: error.request ? "fetch" : errorType,
            stack: error.stack,
            message: error.message,
            lineno: error.lineNumber,
            colno: error.columnNumber,
            filename: error.fileName,
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
                lineno: error.lineNumber,
                colno: error.columnNumber,
                filename: error.fileName,
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
        oldLog("oldLog|emit business msg:", msg, [error]);
        CatchError.handleEmitError(error, "business");
      } // 初始化错误

    }, {
      key: "emitInitalError",
      value: function emitInitalError(error, msg) {
        if (error && error.extra === undefined) error.extra = msg;
        oldLog("oldLog|emit initial msg:", msg, [error]);
        CatchError.handleEmitError(error, "inital");
      } // 请求错误

    }, {
      key: "emitFetchError",
      value: function emitFetchError(error, msg) {
        if (error && error.extra === undefined) error.extra = msg;
        oldLog("oldLog|emit fetch msg:", msg, [error]);
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

  _defineProperty(CatchError, "setExtraData", function (v) {
    extraData.push(String(v));
  });

  _defineProperty(CatchError, "clearExtraData", function () {
    return extraData = [];
  });

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
    isFirstTimeVisit = true;
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
    return mapping;
  };

  CatchError.init(); // for (let index = 0; index < 100; index++) {
  //     console.log(CatchError.fakeRandom(Date.now() * Math.random()));
  // }
})(window);