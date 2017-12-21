import {AppState} from 'react-native'
import WebViewEventHelper from "../helper/WebViewEventHelper";

let stateWebView

let StateBridge = (payload, webView) => {
  stateWebView = webView;
  let handleAppStateChange = (state) => {
    if (stateWebView) {
      WebViewEventHelper.postEvent('STATE', JSON.stringify(state), stateWebView);
    }
  };

  if (payload.type === 'ADD_LISTENER') {
    AppState.addEventListener('change', handleAppStateChange);
  } if (payload.type === 'REMOVE_LISTENER') {
    AppState.removeEventListener('change', handleAppStateChange);
  }
};

export default StateBridge
