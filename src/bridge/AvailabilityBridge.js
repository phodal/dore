/**
 * @name APP Availability Bridge
 * @description
 * Dore APP Availability check
 *
 * @example
 *
 * DoreClient.getAsyncStorage('')
 * DoreClient.saveAsyncStorage('')
 *
 */
let AvailabilityBridge = (payload, webView, AppInstalledChecker) => {
  if (payload.type === 'GET_LIST') {
    AppInstalledChecker
      .getAppList()
      .then((results) => {
        webView.postMessage(JSON.stringify({apps: results}));
      });
  }if (payload.type === 'IS_INSTALLED') {
    AppInstalledChecker
      .isAppInstalled(payload.name)
      .then((isInstalled) => {
        webView.postMessage(JSON.stringify({isInstalled: isInstalled}));
      });
  } else if (payload.type === 'IS_INSTALLED_ANDROID') {
    AppInstalledChecker
      .isAppInstalledAndroid(payload.name)
      .then((isInstalled) => {
        webView.postMessage(JSON.stringify({isInstalled: isInstalled}));
      });
  } else if (payload.type === 'URL_SCHEME') {
    AppInstalledChecker
      .checkURLScheme(payload.name) // omit the :// suffix
      .then((isInstalled) => {
        webView.postMessage(JSON.stringify({isInstalled: isInstalled}));
      })
  }
};

export default AvailabilityBridge
