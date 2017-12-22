import WebViewEventHelper from '../helper/WebViewEventHelper';

/**
 * @name Shake Event Listener
 * @description
 * Dore Share Event Bridge
 *
 * @example
 *
 * $ionicPlatform.on('SHAKE', function (response) {
 *   $scope.shake = response.detail.data;
 *   $scope.$apply();
 * });
 * DoreClient.addShakeListener();
 *
 */

let ShakeEvent = (payload, webView, Shake) => {
  if (payload.type === 'ADD_LISTENER') {
    Shake.addEventListener('shake', () => {
      WebViewEventHelper.postEvent('SHAKE', JSON.stringify({shake: true}), webView);
    });
  } if (payload.type === 'REMOVE_LISTENER') {
    Shake.removeEventListener('shake');
  }
};

export default ShakeEvent
