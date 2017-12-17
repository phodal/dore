import React, { Component } from 'react'
import {View, WebView, Dimensions} from "react-native";
import Toast from 'dore-toast';
import Orientation from 'react-native-orientation';
import RNIconBadge from 'dore-icon-badge'
import RNDeviceInfo from "react-native-device-info";

import Dore from 'dore';

let {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window');

export default class ExampleWebView extends Component {
  static componentName = 'ExampleWebView';

  constructor() {
    super()
    this.state = {
      isLoading: true
    }
    Dore.inject([{
      name: 'Toast',
      class: Toast
    }, {
      name: 'Orientation',
      class: Orientation
    }, {
      name: 'RNIconBadge',
      class: RNIconBadge
    }, {
      name: 'RNDeviceInfo',
      class: RNDeviceInfo
    }])
  }

  onMessage = evt => {
    Dore.handleMessage(evt, this.webView)
  };

  onWebViewLoadStart = () => {
    if (this.state.isLoading) {
      this.webView.injectJavaScript('window.isPhone = true;');
    }
  };

  render() {
    const source = require('./www/index.html');

    return (
      <View>
        <WebView
          bounces={false}
          startInLoadingState={false}
          allowUniversalAccessFromFileURLs
          ref={webView => {
            this.webView = webView
          }}
          source={source}
          style={{width:deviceWidth, height:deviceHeight}}
          onMessage={this.onMessage}
          onLoadStart={this.onWebViewLoadStart}
        />
      </View>
    )

  }
}
