import WebViewEventHelper from '../helper/WebViewEventHelper';

let BackHandler ={};

let handler = () => {
  WebViewEventHelper.postEvent('ANDROID_BACK');
};

BackHandler.addListener = () => {
  BackHandler.addEventListener('hardwareBackPress', handler);
};
BackHandler.removeListener = () => {
  BackHandler.removeEventListener('hardwareBackPress', handler);
};

export default BackHandler
