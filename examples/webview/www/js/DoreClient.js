/*global define */
(function (global, factory) {
  'use strict';
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = global.document
      ? factory(global, true)
      : function (w) {
        if (!w.document) {
          throw new Error('jQuery requires a window with a document');
        }
        return factory(w);
      };
  } else {
    factory(global);
  }
})(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {

  function postMessage(action, payload) {
    var message = JSON.stringify({
      action: action,
      payload: payload
    });
    if (window.isPhone) {
      window.postMessage(message, '');
    } else {
      console.log(message);
    }
  }

  function getAsyncData(action, payload) {
    return new Promise(function (resolve, reject) {
      function listener(event) {
        event.target.removeEventListener('message', listener, false);
        resolve(JSON.parse(event.data));
      }

      window.document.addEventListener('message', listener, false);
      window.postMessage(
        JSON.stringify({
          action: action,
          payload: payload
        })
      );

      setTimeout(function () {
        reject('timeout');
      }, 3000);
    });
  }

  function invoke(action, payload) {
    postMessage(action, payload);
  }

  var DoreClient = {
    invoke: function (options) {
      invoke(options.action, options.payload);
    },
    getAsyncData: function (options, cb) {
      getAsyncData(options.action, options.payload).then(function (results) {
        cb(results);
      })
    },
    getAppVersion: function () {
      return getAsyncData('DEVICE_INFO', {type: 'APP_VERSION'});
    },
    getUniqueID: function () {
      return getAsyncData('DEVICE_INFO', {type: 'DEVICE_ID'});
    },
    getBrand: function () {
      return getAsyncData('DEVICE_INFO', {type: 'BRAND'});
    },
    getModel: function () {
      return getAsyncData('DEVICE_INFO', {type: 'MODEL'});
    },
    getSystemName: function () {
      return getAsyncData('DEVICE_INFO', {type: 'SYSTEM_NAME'});
    },
    isEmulator: function () {
      return getAsyncData('DEVICE_INFO', {type: 'IS_EMULATOR'});
    },
    isTablet: function () {
      return getAsyncData('DEVICE_INFO', {type: 'IS_TABLET'});
    },
    showToast: function (message, duration, position) {
      return invoke('TOAST', {
        options: {duration: duration, position: position},
        message: message
      });
    },
    showDatePicker: function (options) {
      options.TYPE = 'DATE_PICKER';
      return getAsyncData('DATE_PICKER', options);
    },
    setBadge: function (badgeNumber) {
      return invoke('BADGE', {type: 'SET_BADGE', badgeNumber: badgeNumber});
    },
    getBadge: function (badgeNumber) {
      return getAsyncData('BADGE', {
        type: 'GET_BADGE',
        badgeNumber: badgeNumber
      });
    },
    clearBadge: function () {
      return invoke('BADGE', {type: 'CLEAR_BADGE'});
    },
    hideKeyboard: function () {
      return invoke('KEYBOARD', {type: 'DISMISS'});
    },
    getCurrentPosition: function (text) {
      return getAsyncData('GEOLOCATION', {
        type: 'CURRENT_POSITION',
        text: text
      });
    },
    watchPosition: function (text) {
      return invoke('GEOLOCATION', {type: 'WATCH_POSITION', text: text});
    },
    clearWatch: function (text) {
      return invoke('GEOLOCATION', {type: 'CLEAR_WATCH', text: text});
    },
    stopObserving: function (text) {
      return invoke('GEOLOCATION', {type: 'STOP_OBSERVING', text: text});
    },
    copy: function (text) {
      return invoke('CLIPBOARD', {type: 'COPY', text: text});
    },
    paste: function () {
      return invoke('CLIPBOARD', {type: 'PASTE'});
    },
    open: function (text) {
      return invoke('OPEN_LINK', text);
    },
    getOrientation: function () {
      return getAsyncData('ORIENTATION', {type: 'ORIENTATION'});
    },
    lockToPortrait: function () {
      return invoke('ORIENTATION', {type: 'LOCK_PORTRAIT'});
    },
    lockToLandscape: function () {
      return invoke('ORIENTATION', {type: 'LOCK_LANDSCAPE'});
    },
    getConnectionInfo: function () {
      return getAsyncData('NET_INFO', {type: 'CONNECTION_INFO'});
    },
    addNetInfoEventListener: function () {
      return invoke('NET_INFO', {type: 'ADD_LISTENER'});
    },
    removeNetInfoEventListener: function () {
      return invoke('NET_INFO', {type: 'REMOVE_LISTENER'});
    },
    hideStatusBar: function () {
      return invoke('STATUS_BAR', {type: 'HIDE'});
    },
    showStatusBar: function () {
      return invoke('STATUS_BAR', {type: 'SHOW'});
    },
    addStateListener: function () {
      return invoke('STATE', {type: 'ADD_LISTENER'});
    },
    removeStateListener: function () {
      return invoke('STATE', {type: 'REMOVE_LISTENER'});
    },
    vibrationVibrate: function (duration) {
      return invoke('VIBRATION', {type: 'VIBRATE', duration: duration});
    },
    vibrationCancel: function () {
      return invoke('VIBRATION', {type: 'CANCEL'});
    },
    setBrightnessLevel: function (luminous) {
      return invoke('BRIGHTNESS', {type: 'SET', luminous: luminous});
    },
    getBrightnessLevel: function () {
      return getAsyncData('BRIGHTNESS', {type: 'GET'});
    },
    checkPermissions: function (permission, options) {
      return getAsyncData('PERMISSIONS', {type: 'CHECK', permission: permission, options: options});
    },
    requestPermissions: function (permission, options) {
      return getAsyncData('PERMISSIONS', {type: 'REQUEST', permission: permission, options: options});
    },
    checkMultiple: function (permission, options) {
      return getAsyncData('PERMISSIONS', {type: 'CHECK_MULTIPLE', permission: permission, options: options});
    },
    captureScreen: function (options) {
      return getAsyncData('SCREENSHOT', {type: 'CAPTURE', options: options});
    },
    console: {
      // assert(test?: boolean, message?: string, ...optionalParams: any[]): void;
      assert: function (test, message, ...optionalParams) {
        return invoke('CONSOLE', {
          type: 'assert',
          test,
          message,
          optionalParams
        });
      },
      // clear(): void;
      clear: function () {
        return invoke('CONSOLE', {
          type: 'clear'
        });
      },
      // count(countTitle?: string): void;
      count: function (countTitle) {
        return invoke('CONSOLE', {
          type: 'count',
          countTitle
        });
      },
      // debug(message?: any, ...optionalParams: any[]): void;
      debug: function (message, ...optionalParams) {
        return invoke('CONSOLE', {
          type: 'debug',
          message,
          optionalParams
        });
      },
      // dir(value?: any, ...optionalParams: any[]): void;
      dir: function (value, ...optionalParams) {
        return invoke('CONSOLE', {
          type: 'dir',
          value,
          optionalParams
        });
      },
      // dirxml(value: any): void;
      dirxml: function (value) {
        return invoke('CONSOLE', {
          type: 'dirxml',
          value
        });
      },
      // error(message?: any, ...optionalParams: any[]): void;
      error: function (message, ...optionalParams) {
        return invoke('CONSOLE', {
          type: 'error',
          message,
          optionalParams
        });
      },
      // exception(message?: string, ...optionalParams: any[]): void;
      exception: function (message, ...optionalParams) {
        return invoke('CONSOLE', {
          type: 'exception',
          message,
          optionalParams
        });
      },
      // group(groupTitle?: string, ...optionalParams: any[]): void;
      group: function (groupTitle, ...optionalParams) {
        return invoke('CONSOLE', {
          type: 'group',
          groupTitle,
          optionalParams
        });
      },
      // groupCollapsed(groupTitle?: string, ...optionalParams: any[]): void;
      groupCollapsed: function (groupTitle, ...optionalParams) {
        return invoke('CONSOLE', {
          type: 'groupCollapsed',
          groupTitle,
          optionalParams
        });
      },
      // groupEnd(): void;
      groupEnd: function () {
        return invoke('CONSOLE', {
          type: 'groupEnd'
        });
      },
      // info(message?: any, ...optionalParams: any[]): void;
      info: function (message, ...optionalParams) {
        return invoke('CONSOLE', {
          type: 'info',
          message,
          optionalParams
        });
      },
      // log(message?: any, ...optionalParams: any[]): void;
      log: function (message, ...optionalParams) {
        return invoke('CONSOLE', {
          type: 'log',
          message,
          optionalParams
        });
      },
      // msIsIndependentlyComposed(element: Element): boolean;
      msIsIndependentlyComposed: function (element) {
        return invoke('CONSOLE', {
          type: 'msIsIndependentlyComposed',
          element
        });
      },
      // profile(reportName?: string): void;
      profile: function (reportName) {
        return invoke('CONSOLE', {
          type: 'profile',
          reportName
        });
      },
      // profileEnd(): void;
      profileEnd: function () {
        return invoke('CONSOLE', {
          type: 'profileEnd'
        });
      },
      // select(element: Element): void;
      select: function (element) {
        return invoke('CONSOLE', {
          type: 'select',
          element
        });
      },
      // table(...data: any[]): void;
      table: function (data) {
        return invoke('CONSOLE', {
          type: 'table',
          data
        });
      },
      // time(timerName?: string): void;
      time: function (timerName) {
        return invoke('CONSOLE', {
          type: 'time',
          timerName
        });
      },
      // timeEnd(timerName?: string): void;
      timeEnd: function (timerName) {
        return invoke('CONSOLE', {
          type: 'timeEnd',
          timerName
        });
      },
      // trace(message?: any, ...optionalParams: any[]): void;
      trace: function (message, ...optionalParams) {
        return invoke('CONSOLE', {
          type: 'trace',
          message,
          optionalParams
        });
      },
      // warn(message?: any, ...optionalParams: any[]): void;
      warn: function (message, ...optionalParams) {
        return invoke('CONSOLE', {
          type: 'warn',
          message,
          optionalParams
        });
      }
    }
  };

  function awaitPostMessage() {
    var isReactNativePostMessageReady = !!window.originalPostMessage;
    var queue = [];
    var currentPostMessageFn = function store(message) {
      if (queue.length > 100) queue.shift();
      queue.push(message);
    };
    if (!isReactNativePostMessageReady) {
      var originalPostMessage = window.postMessage;
      Object.defineProperty(window, 'postMessage', {
        configurable: true,
        enumerable: true,
        get: function () {
          return currentPostMessageFn;
        },
        set: function (fn) {
          currentPostMessageFn = fn;
          isReactNativePostMessageReady = true;
          setTimeout(sendQueue, 0);
        }
      });
      window.postMessage.toString = function () {
        return String(originalPostMessage);
      };
    }

    function sendQueue() {
      while (queue.length > 0) window.postMessage(queue.shift());
    }
  }

  if (!!window.isPhone) {
    awaitPostMessage(); // Call this only once in your Web Code.
    // TODO: fix console issue
    window.console = DoreClient.console
  }
  if (typeof define === 'function' && define.amd) {
    define('DoreClient', [], function () {
      return DoreClient;
    });
  }
  var strundefined = typeof undefined;
  if (typeof noGlobal === strundefined) {
    window.DoreClient = DoreClient;
  }

  return DoreClient;
});
