import {BackHandler} from 'react-native';
import WebViewEventHelper from '../helper/WebViewEventHelper';

/**
 * @name Back Bridge
 * @description
 * Dore BackBridge to handle Android Backbutton event
 *
 * @example
 * $ionicPlatform.on('ANDROID_BACK', function (event) {
 *    DoreClient.showToast('ANDROID_BACK');
 * });
 *
 */
let BackBridge = {};

let bridgeWebView = null;
let handler = () => {
  if (bridgeWebView) {
    WebViewEventHelper.postEvent('ANDROID_BACK', '', bridgeWebView);
  }
};

BackBridge.addListener = (webView) => {
  bridgeWebView = webView;
  BackHandler.addEventListener('hardwareBackPress', handler);
};
BackBridge.removeListener = () => {
  BackHandler.removeEventListener('hardwareBackPress', handler);
};

export default BackBridge
