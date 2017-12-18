angular.module('starter.controllers', [])
  .controller('DashCtrl', function ($scope, $ionicPlatform) {
    $scope.version = null;
    $scope.text = 'Text Copy';
    $scope.copyText = '';

    DoreClient.addStateListener();
    $ionicPlatform.on('STATE', function (event) {
      $scope.state = event.detail.data;
      $scope.$apply();
    });

    $ionicPlatform.on('ANDROID_BACK', function (event) {
      DoreClient.showToast('ANDROID_BACK');
    });

    DoreClient.getAppVersion().then(function (data) {
      $scope.version = data.version;
      $scope.$apply();
    });
    $scope.showToast = function () {
      DoreClient.showToast('this is a toast')
    };
    $scope.showToastCenter = function () {
      DoreClient.showToast('this is a toast', 'long', 'center')
    };

    $scope.open = function () {
      DoreClient.open('https://www.phodal.com/')
    };

    $scope.copy = function () {
      DoreClient.copy($scope.text);
    };
    $scope.paste = function () {
      $ionicPlatform.on('PASTE', function (event) {
        $scope.copyText = event.detail.data;
        $scope.$apply();
      });
      DoreClient.paste();
    };

    $scope.getBadge = function () {
      DoreClient.getBadge()
    };
    $scope.setBadge = function () {
      DoreClient.setBadge(19)
    };
    $scope.addBadge = function () {
      DoreClient.addBadge(1)
    };
    $scope.minusBadge = function () {
      DoreClient.minusBadge(1)
    };
    $scope.showDatePicker = function () {
      var options = {
        date: '2017-10-22 12:12:12',
        maxDate: '2022-10-22 12:12:12'
      };
      DoreClient.showDatePicker(options).then(function (data) {
        $scope.date = data.date;
        $scope.$apply();
      })
    };

    $scope.getCurrentPosition = function () {
      DoreClient.getCurrentPosition().then(function (data) {
        $scope.location = data;
        $scope.$apply();
      })
    };
    $scope.watchPosition = function () {
      $ionicPlatform.on('WATCH_POSITION', function (event) {
        $scope.wPosition = event.detail.data;
        $scope.$apply();
      });
      DoreClient.watchPosition()
    };
    $scope.clearWatch = function () {
      DoreClient.clearWatch()
    };
    $scope.stopObserving = function () {
      DoreClient.stopObserving()
    };
    $scope.getOrientation = function () {
      DoreClient.getOrientation().then(function (data) {
        $scope.orientation = data;
        $scope.$apply();
      })
    };
    $scope.lockToLandscape = function () {
      DoreClient.lockToLandscape();
    };
    $scope.lockToPortrait = function () {
      DoreClient.lockToPortrait();
    };
    $scope.getConnectionInfo = function () {
      DoreClient.getConnectionInfo().then(function (data) {
        $scope.connectionInfo = data;
        $scope.$apply();
      })
    };
    $scope.addEventListener = function () {
      $ionicPlatform.on('CONNECTION_CHANGE', function (event) {
        $scope.wConnectionInfo = event.detail.data;
        $scope.$apply();
      });
      DoreClient.addNetInfoEventListener();
    };
    $scope.removeEventListener = function () {
      DoreClient.removeNetInfoEventListener();
    };
    $scope.hideStatusBar = function () {
      DoreClient.hideStatusBar();
    };
    $scope.showStatusBar = function () {
      DoreClient.showStatusBar();
    };
    $scope.vibrationVibrate = function () {
      DoreClient.vibrationVibrate([1000, 2000, 3000]);
    };
    $scope.vibrationCancel = function () {
      DoreClient.vibrationCancel();
    };
    $scope.getBrightness = function () {
      DoreClient.getBrightnessLevel().then(function(brightness) {
        $scope.brightness = brightness;
        $scope.$apply();
      })
    };
    $scope.setBrightness = function () {
      DoreClient.setBrightnessLevel(0.2);
    };
  })

  .controller('DeviceCtrl', function ($scope) {
    $scope.getAppVersion = function () {
      DoreClient.getAppVersion().then(function (data) {
        $scope.version = data.version;
        $scope.$apply();
      });
    };
    $scope.getUniqueID = function () {
      DoreClient.getUniqueID().then(function (data) {
        $scope.uniqueID = data.uniqueID;
        $scope.$apply();
      });
    };
    $scope.getBrand = function () {
      DoreClient.getBrand().then(function (data) {
        $scope.brand = data.brand;
        $scope.$apply();
      })
    };
    $scope.getModel = function () {
      DoreClient.getModel().then(function (data) {
        $scope.model = data.model;
        $scope.$apply();
      })
    };
    $scope.getSystemName = function () {
      DoreClient.getSystemName().then(function (data) {
        $scope.systemName = data.systemName;
        $scope.$apply();
      })
    };
    $scope.isEmulator = function () {
      DoreClient.isEmulator().then(function (data) {
        $scope.isEmulator = data;
        $scope.$apply();
      })
    };
    $scope.isTablet = function () {
      DoreClient.isTablet().then(function (data) {
        $scope.isTablet = data;
        $scope.$apply();
      })
    }
  });
