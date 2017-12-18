/*global define */
(function (global, factory) {
  "use strict";
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document ?
      factory(global, true) :
      function (w) {
        if (!w.document) {
          throw new Error("jQuery requires a window with a document");
        }
        return factory(w);
      };
  } else {
    factory(global);
  }

}(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
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
      window.postMessage(JSON.stringify({
        action: action,
        payload: payload
      }));

      setTimeout(function () {
        reject('timeout');
      }, 3000);
    });
  }

  function invoke(action, payload) {
    postMessage(action, payload);
  }

  var DoreClient = {
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
      return invoke('TOAST', {options: {duration: duration, position: position}, message: message});
    },
    showDatePicker: function (options) {
      options.TYPE = 'DATE_PICKER';
      return getAsyncData('DATE_PICKER', options);
    },
    setBadge: function (badgeNumber) {
      return invoke('BADGE', {type: 'SET_BADGE', badgeNumber: badgeNumber});
    },
    getBadge: function (badgeNumber) {
      return getAsyncData('BADGE', {type: 'GET_BADGE', badgeNumber: badgeNumber});
    },
    addBadge: function (badgeNumber) {
      return invoke('BADGE', {type: 'ADD_BADGE', badgeNumber: badgeNumber});
    },
    minusBadge: function (badgeNumber) {
      return invoke('BADGE', {type: 'MINUS_BADGE', badgeNumber: badgeNumber});
    },
    cleanBadge: function (badgeNumber) {
      return invoke('BADGE', {type: 'CLEAN_BADGE', badgeNumber: badgeNumber});
    },
    hideKeyboard: function () {
      return invoke('KEYBOARD', {type: 'DISMISS'});
    },
    getCurrentPosition: function (text) {
      return getAsyncData('GEOLOCATION', {type: 'CURRENT_POSITION', text: text});
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
    setBrightnessLevel: function () {
      return invoke('BRIGHTNESS', {type: 'set'});
    },
    getBrightnessLevel: function () {
      return getAsyncData('BRIGHTNESS', {type: 'GET'});
    },
    getSystemBrightnessLevel: function () {
      return getAsyncData('BRIGHTNESS', {type: 'GET_SYSTEM'});
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
  }
  if (typeof define === "function" && define.amd) {
    define("DoreClient", [], function () {
      return DoreClient;
    });
  }
  var strundefined = typeof undefined;
  if (typeof noGlobal === strundefined) {
    window.DoreClient = DoreClient;
  }
  return DoreClient;
}));
