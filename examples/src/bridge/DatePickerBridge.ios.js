import {
  NativeEventEmitter,
  NativeModules,
} from 'react-native'

const RNNoTagDatePicker = NativeModules.RNNoTagDatepicker;
let DatePickerBridge = (payload, webView) => {
  const DatePickerEvent = new NativeEventEmitter(NativeModules.RNNoTagDatepicker);

  DatePickerEvent.addListener('DATEPICKER_NATIVE_INVOKE', (evt) => {
    if (evt.status === 'success') {
      const toMSUnit = parseFloat(evt.value) * 1000;
      const date = new Date(toMSUnit);
      webView.postMessage(JSON.stringify({
        type: 'DATE_PICKER',
        success: true,
        date,
      }))
    }
  });

  const showDatePicker = async (options) => {
    try {
      RNNoTagDatePicker.show(options)
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  };

  showDatePicker({
    date: payload.date,
    maxDate: payload.maxDate,
  }, webView)
};

export default DatePickerBridge
