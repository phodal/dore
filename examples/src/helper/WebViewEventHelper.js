const WebViewEventHelper = {};

WebViewEventHelper.postEvent = (action, data, webView) => {
  let postData = {data: data};
  let js = 'var event = new CustomEvent("' + action + '", {detail: ' + JSON.stringify(postData) + '});';
  js += 'window.document.dispatchEvent(event);';
  webView.injectJavaScript(js);
};

export default WebViewEventHelper
