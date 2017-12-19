/**
 * @name Screenshot Bridge
 * @description
 * Dore Screenshot Bridge to capture Screenshot
 *
 * @example
 * DoreClient.captureScreen().then(uri){
 *
 * }
 */
let ScreenshotBridge = (payload, webView, Capture) => {
  if (payload.type === 'CAPTURE') {
    let options = {
      format: "jpg",
      quality: 0.8
    };

    if (payload.options) {
      options = payload.options;
    }

    Capture(options).then(
      uri => {
        webView.postMessage(uri);
      },
      error => {
        console.error("Oops, snapshot failed", error)
      }
    );
  }
}

export default ScreenshotBridge

