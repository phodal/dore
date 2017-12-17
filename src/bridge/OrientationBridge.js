let OrientationBridge = (payload, webView, Orientation) => {
  if (payload.type === 'LOCK_PORTRAIT') {
    Orientation.lockToPortrait()
  } else if (payload.type === 'LOCK_LANDSCAPE') {
    Orientation.lockToLandscape()
  } else if (payload.type === 'ORIENTATION') {
    Orientation.getOrientation((err, orientation) => {
      webView.postMessage(JSON.stringify({orientation: orientation}))
    });
  }
};

export default OrientationBridge
