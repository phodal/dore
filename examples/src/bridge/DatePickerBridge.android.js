import {DatePickerAndroid} from 'react-native'

let DatePickerBridge = (payload, webView) => {
  const showPicker = async (options, webView) => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open(options)
      if (action === DatePickerAndroid.dismissedAction) {
        webView.postMessage(JSON.stringify({
          type: 'DATE_PICKER',
          success: false
        }))
      } else {
        const date = new Date(year, month, day);
        webView.postMessage(JSON.stringify({
          type: 'DATE_PICKER',
          success: true,
          date
        }))
      }
    } catch ({code, message}) {
      // console.warn('Cannot open date picker', message)
    }
  };

  showPicker({
    date: new Date(payload.date),
    maxDate: new Date(payload.maxDate),
  }, webView)
};

export default DatePickerBridge
