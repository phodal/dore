import {Clipboard} from 'react-native'
import WebViewEventHelper from '../helper/WebViewEventHelper';

let ClipboardBridge = (payload, webView) => {
  if (payload.type === 'COPY') {
    Clipboard.setString(payload.text)
  } else if (payload.type === 'PASTE') {
    console.log('PASTE')
    Clipboard.getString().then((data) => {
      WebViewEventHelper.postEvent('PASTE', JSON.stringify(data), webView)
    })
  }
};

export default ClipboardBridge
