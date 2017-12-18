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
let BadgeBridge = (payload, webView, IconBadge) => {
  if (payload.type === 'SET_BADGE') {
    IconBadge.setIconBadge(payload.badgeNumber)
  } else if (payload.type === 'ADD_BADGE') {
    IconBadge.badgeAdd(payload.badgeNumber)
  } else if (payload.type === 'MINUS_BADGE') {
    IconBadge.badgeMinus(payload.badgeNumber)
  } else if (payload.type === 'CLEAR_BADGE') {
    IconBadge.clearBadge()
  } else if (payload.type === 'GET_BADGE') {
    IconBadge.getBadgeNumber().then((data) => {
      webView.postMessage(JSON.stringify(data))
    })
  }
};

export default BadgeBridge
