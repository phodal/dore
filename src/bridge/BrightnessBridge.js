let BrightnessBridge = (payload, webView, Brightness) => {
  if (payload.type === 'GET') {
    Brightness.getBrightnessLevel()
      .then(function (luminous) {
        webView.postMessage(luminous);
      });
  } else if (payload.type === 'SET') {
    if(payload.luminous) {
      Brightness.setBrightnessLevel(payload.luminous);
    }
  } else if (payload.type === 'GET_SYSTEM') {
    Brightness.getSystemBrightnessLevel()
      .then(function (luminous) {
        webView.postMessage(luminous);
      });
  }
}

export default BrightnessBridge
