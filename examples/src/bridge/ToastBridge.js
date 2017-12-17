import Toast from 'react-native-toast';

let ToastBridge = (payload) => {
  let message = payload.message;
  if (!payload.options) {
    return Toast.show(message);
  }
  let duration = payload.options.duration;
  let position = payload.options.position;

  if (duration === 'short') {
    if (position === 'top') {
      return Toast.showShortTop(message)
    } else if (position === 'center') {
      return Toast.showShortCenter(message)
    } else {
      return Toast.showShortBottom(message)
    }
  }

  if (duration === 'long') {
    if (position === 'top') {
      return Toast.showLongTop(message)
    } else if (position === 'center') {
      return Toast.showLongCenter(message)
    } else {
      return Toast.showLongBottom(message)
    }
  }

  if (position) {
    if (position === 'top') {
      return Toast.showShortTop(message)
    } else if (position === 'center') {
      return Toast.showShortCenter(message)
    } else {
      return Toast.showShortBottom(message)
    }
  }

  return Toast.show(message)
};

export default ToastBridge
