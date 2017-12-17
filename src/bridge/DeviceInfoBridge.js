import RNDeviceInfo from "react-native-device-info";

let deviceInfoBridge = (payload, webView) => {
  const info = {};

  if (payload.type === 'APP_VERSION') {
    info.version = RNDeviceInfo.getVersion();
  } else if (payload.type === 'DEVICE_ID') {
    info.uniqueID = RNDeviceInfo.getUniqueID();
  } else if (payload.type === 'BRAND') {
    info.brand = RNDeviceInfo.getBrand();
  } else if (payload.type === 'MODEL') {
    info.model = RNDeviceInfo.getModel();
  } else if (payload.type === 'SYSTEM_NAME') {
    info.systemName = RNDeviceInfo.getSystemName();
  } else if (payload.type === 'IS_EMULATOR') {
    info.isEmulator = RNDeviceInfo.isEmulator();
  } else if (payload.type === 'IS_TABLET') {
    info.isTablet = RNDeviceInfo.isTablet();
  } else {
    info.version = RNDeviceInfo.getVersion();
    info.uniqueID = RNDeviceInfo.getUniqueID();
    info.brand = RNDeviceInfo.getBrand();
    info.model = RNDeviceInfo.getModel();
    info.systemName = RNDeviceInfo.getSystemName();
    info.isEmulator = RNDeviceInfo.isEmulator();
    info.isTablet = RNDeviceInfo.isTablet();
  }
  webView.postMessage(JSON.stringify(info))
};

export default deviceInfoBridge
