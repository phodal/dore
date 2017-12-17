angular.module('starter').service('DoreClient', function ($q) {
  function postMessage(action, payload) {
    if (window.isPhone) {
      window.postMessage(JSON.stringify({
        action: action,
        payload: payload
      }));
    } else {
      console.log({
        action: action,
        payload: payload
      });
    }
  }

  function getAsyncData(action, payload) {
    return $q(function (resolve, reject) {
      function listener(event) {
        event.target.removeEventListener('message', listener, false);
        resolve(JSON.parse(event.data));
      }

      window.document.addEventListener('message', listener, false);
      postMessage(action, payload);

      setTimeout(function () {
        reject('timeout');
      }, 3000);
    });
  }

  function invoke(action, payload) {
    postMessage(action, payload);
  }

  return {
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
    removeStateListner: function () {
      return invoke('STATE', {type: 'REMOVE_LISTENER'});
    }
  }
});
