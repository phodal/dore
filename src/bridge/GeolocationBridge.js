import WebViewEventHelper from '../helper/WebViewEventHelper';

let watchID = null;

let GeolocationBridge = (payload, webView) => {
  if (payload.type === 'CURRENT_POSITION') {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        webView.postMessage(JSON.stringify(position))
      },
      (error) => webView.postMessage(JSON.stringify(error.message)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  } else if (payload.type === 'CLEAR_WATCH') {
    if (watchID) {
      navigator.geolocation.clearWatch(watchID);
    }
  } else if (payload.type === 'WATCH_POSITION') {
    watchID = navigator.geolocation.watchPosition(
      (position) => {
        WebViewEventHelper.postEvent('WATCH_POSITION', JSON.stringify(position), webView)
      },
      (error) => webView.postMessage(JSON.stringify(error.message))
    );
  } else if (payload.type === 'STOP_OBSERVING') {
    navigator.geolocation.stopObserving()
  }
};

export default GeolocationBridge
