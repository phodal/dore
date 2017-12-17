import RNIconBadge from 'dore-icon-badge'

let BadgeBridge = (payload, webView) => {
  if (payload.type === 'SET_BADGE') {
    RNIconBadge.setIconBadge(payload.badgeNumber)
  } else if (payload.type === 'ADD_BADGE') {
    RNIconBadge.badgeAdd(payload.badgeNumber)
  } else if (payload.type === 'MINUS_BADGE') {
    RNIconBadge.badgeMinus(payload.badgeNumber)
  } else if (payload.type === 'CLEAR_BADGE') {
    RNIconBadge.clearBadge()
  } else if (payload.type === 'GET_BADGE') {
    RNIconBadge.getBadgeNumber().then((data) => {
      webView.postMessage(JSON.stringify(data))
    })
  }
};

export default BadgeBridge
