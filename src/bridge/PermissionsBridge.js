
/**
 * @name Permissions Bridge
 * @description
 * Dore BackBridge to check & request Permissions
 *
 * @example
 * $ionicPlatform.on('ANDROID_BACK', function (event) {
 *    DoreClient.showToast('ANDROID_BACK');
 * });
 *
 */
let PermissionsBridge = (payload, webView, Permissions) => {
  if (payload.options.type) {
    console.warn("error, unknown type: " + payload.options.type);
    return;
  }
  if (!payload.options.options) {
    payload.options.options = { type: 'always' }
  }
  if (payload.type === 'CHECK') {
    Permissions.check(payload.options.type, payload.options.options).then(response => {
      let response = { locationPermission: response };
      webView.postMessage(response);
    })
  } else if (payload.type === 'REQUEST') {
    Permissions.check(payload.options.type, payload.options.options).then(response => {
      let response = { locationPermission: response };
      webView.postMessage(response);
    })
  } else if (payload.type === 'CHECK_MULTIPLE') {
    Permissions.check(payload.options.type, payload.options.options).then(response => {
      let response = { locationPermission: response };
      webView.postMessage(response);
    })
  }
};

export default PermissionsBridge

