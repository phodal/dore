/**
 * @name Storage Bridge
 * @description
 * Dore Storage to save data
 *
 * @example
 *
 * DoreClient.getStorage('')
 * DoreClient.saveStorage('')
 *
 */
let StorageBridge = (payload, webView, Storage) => {
  if (payload.type === 'GET') {
    Storage.get(payload.key).then((response) => {
      webView.postMessage(response);
    })
  } else if (payload.type === 'SET') {
    Storage.set(payload.key, payload.data);
  }
};

export default StorageBridge
