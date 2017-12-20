# Dore

> Dore is a WebView container implemented using React Native. Help you migrate Cordova application to React Native WebView.

**Dore 是一个使用 React Native 实现的 WebView 容器，可以让你在 WebView 调用 React Native 组件。**

设计初衷：用于迁移 Cordova 的 WebView 应用到 React Native 的 WebView。

Ionic v1 + Angular Demo: [examples](https://github.com/phodal/dore/tree/master/examples)

Screenshots:

![Screenshots](./doc/demo.jpg)

Workflow:

![Workflow](./doc/workflow.jpeg)

微信群：

![QRCode](./doc/wechat.jpg)

Features
---

### Support:

 - AsyncSTORAGE
 - BackHandler (Android)
 - Badge (by [react-native-icon-badge](https://github.com/uuau99999/react-native-icon-badge)
 - Brightness （by [react-native-device-brightness](https://github.com/Calvin-Huang/react-native-device-brightness))
 - Console
 - Clipboard 
 - DatePicker (iOS by [react-native-notag-datepicker](https://github.com/phodal/react-native-notag-datepicker))
 - DeviceInfo (by [react-native-device-info](https://github.com/rebeccahughes/react-native-device-info))
 - Geolocation
 - Keyboard
 - NetInfo
 - Orientation
 - Permissions (by [react-native-permissions](https://github.com/yonahforst/react-native-permissions))
 - ScreenShot ([cordova](https://github.com/gitawego/cordova-screenshot), [RN](https://github.com/gre/react-native-view-shot))
 - State
 - StatusBar
 - Toast (by [dore-toast](https://github.com/GrowthStudio/dore-toast))
 - Vibration
 
### Todo 
 
 - APP Availability (https://github.com/ohh2ahh/AppAvailability)
 - Battery (https://github.com/oojr/react-native-battery)
 - BLE 
 - Calender (https://github.com/wmcmahan/react-native-calendar-events)
 - Camera
 - Flashlight (https://github.com/ludo/react-native-torch)
 - fs
 - Push Notifications (https://github.com/zo0r/react-native-push-notification)
 - QRCode
 - Share 
 - SMS (https://github.com/tkporter/react-native-sms)
 - Storage
 - more+
 
Usage
---

```bash
yarn add dore
```

Example
---

1.Import to your React-Native WebView

```javascript
...
import Toast from 'dore-toast';
import Orientation from 'react-native-orientation';
import RNIconBadge from 'dore-icon-badge'
import RNDeviceInfo from "react-native-device-info";

import Dore from 'dore';

export default class ExampleWebView extends Component {
  ...
  
  constructor() {
    super()
    ...
    Dore.inject([{
      name: 'Toast',
      class: Toast
    }, {
      name: 'Orientation',
      class: Orientation
    }, {
      name: 'Badge',
      class: RNIconBadge
    }, {
      name: 'DeviceInfo',
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
    ...

    return (
      <View>
        <WebView
          ...
          onMessage={this.onMessage}
        />
      </View>
    )
  }
}
```

2.import [DoreClient](./client/DoreClient.js), e.x:

```html
<script src="js/promise.js"></script>
<script src="js/DoreClient.js"></script>
```

3.use in JavaScript

```javascript
$scope.showToast = function () {
  DoreClient.showToast('this is a toast')
};
```

APIs
---

### App State

state value: ``active``, ``background``, ``inactive``

```
DoreClient.addStateListener();
$ionicPlatform.on('STATE', function(event) {
  DoreClient.showToast(event.detail.data);
});
```

### AsyncSTORAGE

| function         | return type   |    return             |
-------------------|---------------|-----------------------|
| setAsyncStorage  |        -      |        -              |
| getAsyncStorage  |  promise      |    string             |

```
$scope.setAsyncStorage = function (key, data) {
  DoreClient.setAsyncStorage(key, data);
};

$scope.getAsyncStorage = function (key) {
  DoreClient.getAsyncStorage(key).then(function(response){
    $scope.storage = response.data;
  })
};
```

### Back（ Android Only)

example:

```
$ionicPlatform.on('ANDROID_BACK', function (event) {
  DoreClient.showToast('ANDROID_BACK');
});
```

### Badge

| function         | return type   |    return             |
-------------------|---------------|-----------------------|
| setBadge         |        -      |        -              |
| getBadge         |  promise      | { badge: 'xx' }       |
| clearBadge       |   -           |         -             |

```
$scope.getBadge = function () {
  DoreClient.getBadge().then(function (data) {
    $scope.badge = data.badge;
    $scope.$apply();
  })
};
$scope.setBadge = function() {
  DoreClient.setBadge(19);
};
$scope.clearBadge = function() {
  DoreClient.clearBadge();
};
```

### Brightness

| function             | return type   |    return             |
-----------------------|---------------|-----------------------|
| getBrightnessLevel   |  promise      |      float            |
| setBrightnessLevel   |       -       |      -                |

```
$scope.getBrightness = function () {
  DoreClient.getBrightnessLevel().then(function(brightness) {
    $scope.brightness = brightness;
    $scope.$apply();
  })
};
$scope.setBrightness = function () {
  DoreClient.setBrightnessLevel(0.2);
};
```

### Clipboard

| function             | return type   |    return             |
-----------------------|---------------|-----------------------|
| copy                 |       -       |                       |
| paste                |      event    |  window.event         |

copy:

```
DoreClient.copy($scope.text);
```

paste:

```
$ionicPlatform.on('PASTE', function(event) {
  $scope.copyText = event.detail.data;
  $scope.$apply();
});
DoreClient.paste();
```

### Console ([MDN Console](https://developer.mozilla.org/en-US/docs/Web/API/Console))

> send WebView console to React Native

```
    $scope.console = console; //  can use inline console function after register
    $scope.outputSingleObject = function () {
      let someObject = {str: "Some text", id: 5};
      console.log(someObject);
    };
    $scope.outputMultipleObjects = function () {
      let car = "Dodge Charger";
      let someObject = {str: "Some text", id: 5};
      console.info("My first car was a", car, ". The object is:", someObject);
    };
    $scope.stringSubstitutions = function () {
      for (let i = 0; i < 5; i++) {
        console.log("Hello, %s. You've called me %d times.", "Bob", i + 1);
      }
    };
    $scope.stylingConsoleOutput = function () {
      console.log("This is %cMy stylish message", "color: yellow; font-style: italic; background-color: blue;padding: 2px");
    };
    $scope.groupInTheConsole = function () {
      console.log("This is the outer level");
      console.group();
      console.log("Level 2");
      console.group();
      console.log("Level 3");
      console.warn("More of level 3");
      console.groupEnd();
      console.log("Back to level 2");
      console.groupEnd();
      console.debug("Back to the outer level");
    };
    $scope.timers = function () {
      console.time("answer time");
      alert("Click to continue");
      console.timeEnd("answer time");
    };
    $scope.stackTraces = function () {
      function foo() {
        function bar() {
          console.trace();
        }

        bar();
      }

      foo();
    }
```
### DatePicker


| function             | return type   |    return             |
-----------------------|---------------|-----------------------|
| showDatePicker       |    promise    |    { date: 'xx' }     |


```
var options = {
  date: '2017-10-22 12:12:12',
  maxDate: '2022-10-22 12:12:12'
};
DoreClient.showDatePicker(options).then(function(data) {
  $scope.date = data.date;
  $scope.$apply();
});
```

### DeviceInfo

| function         | return type   |    return             |
-------------------|---------------|-----------------------|
| getAppVersion    |  promise      | { version: 'xx' }     |
| getUniqueID      |  promise      | { uniqueID: 'xx' }    |
| getBrand         |  promise      | { brand: 'xx' }       |
| getModel         |  promise      | { model: 'xx' }       |
| getSystemName    |  promise      | { systemName: 'xx' }  |
| isEmulator       |  promise      | boolean               |
| isTablet         |  promise      | boolean               |
 
examples: 
 
```
$scope.getAppVersion = function() {
  DoreClient.getAppVersion().then(function(data) {
    $scope.version = data.version;
    $scope.$apply();
  });
};
$scope.isTablet = function() {
  DoreClient.isTablet().then(function(data) {
    $scope.isTablet = data;
    $scope.$apply();
  });
};
```

### Geolocation


| function             | return type   |    return             |
-----------------------|---------------|-----------------------|
| getCurrentPosition   |    promise    |         json          |
| watchPosition        |    event      |         event         |
| clearWatch           |       -       |           -           |
| stopObserving        |       -       |           -           |

```
$scope.getCurrentPosition = function() {
  DoreClient.getCurrentPosition().then(function(data) {
    $scope.location = data;
    $scope.$apply();
  });
};

$scope.watchPosition = function() {
  $ionicPlatform.on('WATCH_POSITION', function(event) {
    $scope.wPosition = event.detail.data;
    $scope.$apply();
  });
  DoreClient.watchPosition();
};

$scope.clearWatch = function() {
  DoreClient.clearWatch();
};
$scope.stopObserving = function() {
  DoreClient.stopObserving();
};
```

### Keyboard

| function             | return type   |    return             |
-----------------------|---------------|-----------------------|
| hideKeyboard         |     -         |     -                 |

### NetInfo

| function                    | return type   |    return             |
------------------------------|---------------|-----------------------|
| getConnectionInfo           |    promise    |     json              |
| addNetInfoEventListener     |     event     |     event             |
| removeNetInfoEventListener  |     -         |     -                 |

```
$scope.getConnectionInfo = function() {
  DoreClient.getConnectionInfo().then(function(data) {
    $scope.connectionInfo = data;
    $scope.$apply();
  });
};
$scope.addEventListener = function() {
  $ionicPlatform.on('CONNECTION_CHANGE', function(event) {
    $scope.wConnectionInfo = event.detail.data;
    $scope.$apply();
  });
  DoreClient.addNetInfoEventListener();
};
$scope.removeEventListener = function() {
  DoreClient.removeNetInfoEventListener();
};
```

### Orientation

| function             | return type   |    return             |
-----------------------|---------------|-----------------------|
| getOrientation       |     promise   |    string             |
| lockToLandscape      |        -      |     -                 |
| lockToPortrait       |        -      |     -                 |

```
$scope.lockToLandscape = function() {
  DoreClient.lockToLandscape();
};
$scope.lockToPortrait = function() {
  DoreClient.lockToPortrait();
};
$scope.getConnectionInfo = function() {
  DoreClient.getConnectionInfo().then(function(data) {
    $scope.connectionInfo = data;
    $scope.$apply();
  });
};
```

### Permissions

| function             | return type   |    return             |
-----------------------|---------------|-----------------------|
| checkPermissions     |     promise   |      JSON             |
| requestPermissions   |     promise   |      JSON             |
| checkMultiple        |     promise   |      JSON             |

```
$scope.checkPermissions = function () {
  DoreClient.checkPermissions('camera').then(function(response) {
    DoreClient.showToast(JSON.stringify(response));
  })
};
$scope.requestPermissions = function () {
  DoreClient.requestPermissions('camera').then(function(response) {
    DoreClient.showToast(JSON.stringify(response));
  })
};
$scope.checkMultiple = function () {
  DoreClient.checkMultiple(['camera', 'photo']).then(function(response) {
    DoreClient.showToast(JSON.stringify(response));
  })
};
```

### Screenshot

| function             | return type   |    return             |
-----------------------|---------------|-----------------------|
| captureScreen        |     string    |     URI               |


install: 

```
yarn add react-native-view-shot
react-native link react-native-view-shot
```

inject:

```
import { captureScreen } from "react-native-view-shot";

Dore.inject([{
  name: 'Capture',
  class: captureScreen
}]);
```

Usage

```
DoreClient.captureScreen().then(function(response) {
  
})
```

### StatusBar

| function             | return type   |    return             |
-----------------------|---------------|-----------------------|
| hideStatusBar        |     -         |       -               |
| showStatusBar        |     -         |       -               |

```
DoreClient.hideStatusBar();
DoreClient.showStatusBar();
```


### Toast

| function             | return type   |    return             |
-----------------------|---------------|-----------------------|
| show                 |     -         |       -               |

``DoreClient.showToast(String,  duration: short | long ,  position: 'center' | 'top')``

```
DoreClient.showToast('this is a toast');

DoreClient.showToast('this is a toast', 'long', 'center');
```

### Vibration


| function             | return type   |    return             |
-----------------------|---------------|-----------------------|
| vibrate              |     -         |       -               |
| show                 |     -         |       -               |

```
DoreClient.vibrationVibrate(1000);

DoreClient.vibrationCancel();
```

Development
---
 
### DoreClient：**Browser -> vibrationVibrate -> DoreClient -> window.postMessage -> RN**

DoreClient, handle message in WebView

Browser

```
$scope.vibrationVibrate = function () {
  DoreClient.vibrationVibrate([1000, 2000, 3000]);
};
```  

DoreClient

```
function invoke(action, payload) {
  function postMessage(action, payload) {
    var message = JSON.stringify({
      action: action,
      payload: payload
    });
    window.postMessage(message, '');
  }
}

DoreClient = {
  vibrationVibrate: function (duration) {
    return invoke('VIBRATION', {type: 'VIBRATE', duration: duration});
  }
}
```

### Dore: WebView -> onMessage -> Dore -> xxxBridge -> Native

Dore, handle message in React Native

WebView

```
  onMessage = evt => {
    Dore.handleMessage(evt, this.webView)
  };
```

Dore

```
Dore.handleMessage = (event, webView) => {
  const action = eventData.action;
  switch (action) {
    case 'VIBRATION': {
      return VibrationBridge(payload)
    }
  }
```

Bridge


```
import { Vibration } from 'react-native';

let VibrationBridge = (payload) => {
  if (payload.type === 'VIBRATE') {
    if (!payload.options) {
      return Vibration.vibrate(500)  // is duration is fixed time (about 500ms)
    }

    if (Number.isInteger(payload.duration) || payload.duration.length > 0) {
      return Vibration.vibrate(payload.duration)
    }
  } else if (payload.type === 'CANCEL') {
    Vibration.cancel();
  }
};
```

License
---

[![Phodal's Idea](http://brand.phodal.com/shields/idea-small.svg)](http://ideas.phodal.com/)

© 2017 A [Phodal Huang](https://www.phodal.com)'s [Idea](http://github.com/phodal/ideas).  This code is distributed under the MIT license. See `LICENSE` in this directory.
