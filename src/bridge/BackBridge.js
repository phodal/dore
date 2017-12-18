import { BackHandler } from 'react-native';
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

let handler = () => {
  WebViewEventHelper.postEvent('ANDROID_BACK');
};

BackBridge.addListener = () => {
  BackHandler.addEventListener('hardwareBackPress', handler);
};
BackBridge.removeListener = () => {
  BackHandler.removeEventListener('hardwareBackPress', handler);
};

export default BackBridge
