import {AsyncStorage} from 'react-native';

/**
 * @name AsyncStorage Bridge
 * @description
 * Dore AsyncStorage to save data
 *
 * @example
 *
 * DoreClient.getAsyncStorage('')
 * DoreClient.saveAsyncStorage('')
 *
 */
let AsyncStorageBridge = (payload, webView) => {
  if (payload.type === 'GET') {
    AsyncStorage.getItem(payload.key, (error, result) => {
      if (result === null) {
        webView.postMessage(null);
      } else {
        webView.postMessage(JSON.stringify({data: result}));
      }
    });
  } else if (payload.type === 'SET') {
    AsyncStorage.setItem(payload.key, payload.data);
  }
};

export default AsyncStorageBridge
