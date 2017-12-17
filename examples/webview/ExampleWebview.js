import React, { Component } from 'react'
import {View, WebView, Dimensions} from "react-native";

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
