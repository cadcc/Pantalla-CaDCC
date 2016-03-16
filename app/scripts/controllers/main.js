'use strict';

/**
 * @ngdoc function
 * @name pantallaCaDccApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pantallaCaDccApp
 */
angular.module('pantallaCaDccApp')
  .controller('MainCtrl', function ($scope, $element, $interval) {
    var startColorChange = function () {
      var screen = $($element);

      screen.children().hide();

      var colors = ['#FF0000', '#00FF00', '#0000FF'];
      var count = 12;

      var restoreColor = function () {
        $interval.cancel($scope.blinkInterval);
        screen.css('background-color', '#FFFFFF');
        screen.children().show();
      };

      var changeColor = function () {
        if (count === 0) {
          restoreColor();
          return;
        }
        screen.css('background-color', colors[count % colors.length]);
        count -= 1;
      };

      $scope.blinkInterval = $interval(changeColor, 200);
    };

    // Each 2 hours
    $interval(startColorChange, 2 * 3600 * 1000);
  });
