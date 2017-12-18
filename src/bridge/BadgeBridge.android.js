/**
 * @name Badge Bridge
 * @description
 * Dore BadgeBridge to handle Android Badge
 *
 * @example
 * DoreClient.getBadge()
 * DoreClient.setBadge(19)
 * DoreClient.addBadge(1)
 * DoreClient.minusBadge(1)
 *
 */
let BadgeBridge = (payload, webView, Badge) => {
  if (payload.type === 'SET_BADGE') {
    Badge.setIconBadge(payload.badgeNumber)
  } else if (payload.type === 'CLEAR_BADGE') {
    Badge.clearBadge()
  } else if (payload.type === 'GET_BADGE') {
    Badge.getBadgeNumber().then((data) => {
      webView.postMessage(JSON.stringify(data))
    })
  }
};

export default BadgeBridge
