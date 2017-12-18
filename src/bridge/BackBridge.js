import { BackHandler } from 'react-native';
import WebViewEventHelper from '../helper/WebViewEventHelper';

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
