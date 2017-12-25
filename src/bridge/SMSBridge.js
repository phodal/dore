/**
 * @name APP Availability Bridge
 * @description
 * Dore APP Availability check
 *
 * @example
 *
 * DoreClient.getAsyncStorage('')
 * DoreClient.saveAsyncStorage('')
 *
 */
let SMSBridge = (payload, webView, SMS) => {
  if (payload.type === 'send') {
    SMS.send({
      body: payload.options.body,
      recipients: payload.options.recipients,
      successTypes: ['sent', 'queued']
    }, (completed, cancelled, error) => {
      webView.postMessage(JSON.stringify({completed: completed, cancelled: cancelled }));
    });
  }
};

export default SMSBridge
