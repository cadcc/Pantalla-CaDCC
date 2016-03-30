'use strict';

/**
 * @ngdoc function
 * @name pantallaCaDccApp.directive:Kioskito
 * @description
 * # Kioskito
 * Directive of the pantallaCaDccApp
 */
angular.module('pantallaCaDccApp')
  .directive('placeholder', function () {
    return {
      restrict: 'E',
      scope: {
        size: '=',
        showLogo : '@'
      },
      templateUrl: 'views/directives/placeholder.html',
      controller: ['$scope', function ($scope) {
        $scope.size = parseFloat($scope.size);
        $scope.showLogo = $scope.showLogo === 'true';
      }]
    };
});