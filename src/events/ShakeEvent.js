import WebViewEventHelper from '../helper/WebViewEventHelper';

/**
 * @name Shake Event Listener
 * @description
 * Dore Share Event Bridge
 *
 * @example
 *
 */

let ShakeEvent = (webView, Shake) => {
  if (payload.type === 'ADD_LISTENER') {
    Shake.addEventListener('shake', () => {
      WebViewEventHelper.postEvent('SHAKE', JSON.stringify(state), webView);
    });
  } if (payload.type === 'REMOVE_LISTENER') {
    Shake.removeEventListener('shake');
  }
};

export default ShakeEvent
