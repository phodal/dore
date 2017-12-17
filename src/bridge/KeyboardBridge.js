import {Keyboard} from 'react-native'

let KeyboardBridge = (payload) => {
  if (payload.type === 'DISMISS') {
    Keyboard.dismiss()
  }
};

export default KeyboardBridge
