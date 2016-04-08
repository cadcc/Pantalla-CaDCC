'use strict';

/**
 * @ngdoc function
 * @name pantallaCaDccApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pantallaCaDccApp
 */
angular.module('pantallaCaDccApp')
  .controller('MainCtrl', function ($scope, $rootScope, $interval, $http) {

    // Check new app version each minute
    $scope.checkNewVersionTime = 60 * 1000;

    // Refresh screen each 2 hours
    $scope.startColorChangeTime = 2 * 3600 * 1000;

    $scope.backgroundColor = '#FFFFFF';

    var startColorChange = function () {

      $rootScope.isScreenRefreshing = true;

      var colors = ['#FF0000', '#00FF00', '#0000FF'];
      var count = 12;

      var restoreColor = function () {
        $interval.cancel($scope.blinkInterval);
        $scope.backgroundColor = '#FFFFFF';
        $rootScope.isScreenRefreshing = false;
      };

      var changeColor = function () {
        if (count === 0) {
          restoreColor();
          return;
        }
        $scope.backgroundColor = colors[count % colors.length];
        count -= 1;
      };

      $scope.blinkInterval = $interval(changeColor, 200);
    };

    var checkNewVersion = function () {
      $http.get('data/app.json')
        .then(function (response) {
          if ($scope.currentVersion !== undefined && $scope.currentVersion !== response.data.version) {
            location.reload();
            return;
          }
          $scope.currentVersion = response.data.version;
        });
    };

    // startColorChange();

    $interval(startColorChange, $scope.startColorChangeTime);
    $interval(checkNewVersion, $scope.checkNewVersionTime);
  });
