import {StatusBar} from 'react-native';

let StatusBarBridge = (payload) => {
  if (payload.type === 'HIDE') {
    StatusBar.setHidden(true);
  } if (payload.type === 'SHOW') {
    StatusBar.setHidden(false);
  }
};

export default StatusBarBridge
