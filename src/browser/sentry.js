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
      oldError(`[参数]:${val},匹配结果:${match}`);
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
  class CatchError {
    static report(isInstant) {
      const len = queue.length;
      const _doIt = (start) => {
        clearTimeout(reportDebounceTimer);
        reportDebounceTimer = setTimeout(() => {
          const slice15 = queue.slice(start, len);
          queue = [];
          oldLog("已上报：", slice15);
          const jsonStr = JSON.stringify(slice15);
          CatchError.reportMethod(
            api,
            {
              uu: CatchError.uuid,
              su: CatchError.sessionUUID,
              fu: CatchError.flushUUID,
              t: Date.now(),
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
          oldLog("xhrPost error", error);
          done(false);
        }
      };

      const imagePost = () => {
        const queryStr = `/tiny.png?d=${fixedEncodeURIComponent(
          JSON.stringify(data)
        )}`;
        const img = new Image();
        img.onload = (e) => {
          oldLog("imagePost onload", e);
          done(true);
        };
        img.onerror = (e) => {
          oldLog("imagePost onerror", e);
          xhrPost();
        };
        img.src = url + queryStr;
        return;
      };

      if (navigator.sendBeacon) {
        const form = new FormData();
        form.append("d", JSON.stringify(data));
        const ok = navigator.sendBeacon(url + "/beacon", form);
        oldLog(`send beacon status:${ok}`);
        ok ? done(true) : imagePost();
      } else {
        imagePost();
      }
    }

    static pushIn(data) {
      data = Object.assign({}, data, {
        page: window.location.href,
        // window: {

        // }
      });
      oldLog("pushIn:", data);
      if (zip) queue.push(CatchError.pushInQueue(data));
      else queue.push(data);
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
    static onRouterError(router) {
      router.onError((err) => {
        CatchError.pushIn({
          type: "error",
          consoleType: "",
          errorType: "vue-router",
          stack: err.stack,
          message: err.message,
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
      window.addEventListener(
        "error",
        function (e) {
          const { message, source, lineno, colno, error, filename } = e;
          const target = e.target || e.srcElement;
          const isElementTarget = isElement(target);
          if (isElementTarget) {
            if (target.id === "ignore") {
              oldLog(`target is marked as ignore`);
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
      oldLog("emit business msg:", msg, [error]);
      CatchError.handleEmitError(error, "business");
    }

    // 初始化错误
    static emitInitalError(error, msg) {
      if (error && error.extra === undefined) error.extra = msg;
      oldLog("emit initial msg:", msg, [error]);
      CatchError.handleEmitError(error, "inital");
    }

    // 请求错误
    static emitFetchError(error, msg) {
      if (error && error.extra === undefined) error.extra = msg;
      oldLog("emit fetch msg:", msg, [error]);
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
