import {PushNotificationIOS} from 'react-native'

let BadgeBridge = (payload, webView) => {
  if (payload.type === 'SET_BADGE') {
    PushNotificationIOS.setApplicationIconBadgeNumber(payload.badgeNumber)
  } else if (payload.type === 'ADD_BADGE') {
    PushNotificationIOS.getApplicationIconBadgeNumber((badge) => {
      let newBadgeNumber = badge + payload.badgeNumber;

      if (!newBadgeNumber || newBadgeNumber <= 0) {
        return;
      }

      PushNotificationIOS.setApplicationIconBadgeNumber(newBadgeNumber)
    })
  } else if (payload.type === 'MINUS_BADGE') {
    PushNotificationIOS.getApplicationIconBadgeNumber((badge) => {
      let newBadgeNumber = badge - payload.badgeNumber;

      if (!newBadgeNumber || newBadgeNumber <= 0) {
        return;
      }

      PushNotificationIOS.setApplicationIconBadgeNumber(newBadgeNumber)
    })
  } else if (payload.type === 'CLEAR_BADGE') {
    PushNotificationIOS.setApplicationIconBadgeNumber(0)
  } else if (payload.type === 'GET_BADGE') {
    PushNotificationIOS.getApplicationIconBadgeNumber((badge) => {
      webView.postMessage(JSON.stringify({badgeNumber: badge}))
    })
  }
};

export default BadgeBridge
