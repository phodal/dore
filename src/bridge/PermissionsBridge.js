
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
  if (!payload.permission) {
    console.warn("error, unknown type - " + payload.permission);
    return;
  }
  if (!payload.options) {
    payload.options = { type: 'always' }
  }
  if (payload.type === 'CHECK') {
    Permissions.check(payload.permission, payload.options).then(response => {
      let result = { locationPermission: response };
      webView.postMessage(JSON.stringify(result));
    })
  } else if (payload.type === 'REQUEST') {
    Permissions.request(payload.permission, payload.options).then(response => {
      let result = { locationPermission: response };
      webView.postMessage(JSON.stringify(result));
    })
  } else if (payload.type === 'CHECK_MULTIPLE') {
    Permissions.checkMultiple(payload.permission, payload.options).then(response => {
      let result = { locationPermission: response };
      webView.postMessage(JSON.stringify(result));
    })
  }
};

export default PermissionsBridge
