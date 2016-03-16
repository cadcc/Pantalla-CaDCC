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
      scope: {},
      templateUrl: 'views/directives/placeholder.html'
    };
});