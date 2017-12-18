let DeviceInfoBridge = (payload, webView, DeviceInfo) => {
  const info = {};

  if (payload.type === 'APP_VERSION') {
    info.version = DeviceInfo.getVersion();
  } else if (payload.type === 'DEVICE_ID') {
    info.uniqueID = DeviceInfo.getUniqueID();
  } else if (payload.type === 'BRAND') {
    info.brand = DeviceInfo.getBrand();
  } else if (payload.type === 'MODEL') {
    info.model = DeviceInfo.getModel();
  } else if (payload.type === 'SYSTEM_NAME') {
    info.systemName = DeviceInfo.getSystemName();
  } else if (payload.type === 'IS_EMULATOR') {
    info.isEmulator = DeviceInfo.isEmulator();
  } else if (payload.type === 'IS_TABLET') {
    info.isTablet = DeviceInfo.isTablet();
  } else {
    info.version = DeviceInfo.getVersion();
    info.uniqueID = DeviceInfo.getUniqueID();
    info.brand = DeviceInfo.getBrand();
    info.model = DeviceInfo.getModel();
    info.systemName = DeviceInfo.getSystemName();
    info.isEmulator = DeviceInfo.isEmulator();
    info.isTablet = DeviceInfo.isTablet();
  }
  webView.postMessage(JSON.stringify(info))
};

export default DeviceInfoBridge
