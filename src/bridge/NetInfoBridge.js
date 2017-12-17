import {
  NetInfo
} from 'react-native';
import WebViewEventHelper from "../helper/WebViewEventHelper";

let NetInfoBridge = (payload, webView) => {
  function handleConnectivityChange(connectionInfo) {
    WebViewEventHelper.postEvent('CONNECTION_CHANGE', JSON.stringify(connectionInfo), webView)
  }

  if (payload.type === 'CONNECTION_INFO') {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      webView.postMessage(JSON.stringify({
        type: connectionInfo.type,
        effectiveType: connectionInfo.effectiveType
      }))
    });
  } else if (payload.type === 'REMOVE_LISTENER') {
    NetInfo.removeEventListener(
      'connectionChange',
      handleConnectivityChange
    )
  } else if (payload.type === 'ADD_LISTENER') {
    NetInfo.addEventListener(
      'connectionChange',
      handleConnectivityChange
    );
  }
};

export default NetInfoBridge
