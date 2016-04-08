'use strict';
/*global setWindowDimensions */

/**
 * @ngdoc overview
 * @name pantallaCaDccApp
 * @description
 * # pantallaCaDccApp
 *
 * Main module of the application.
 */
angular
  .module('pantallaCaDccApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function ($rootScope) {
    $rootScope.isScreenRefreshing = false;

    setWindowDimensions($rootScope);

    $(window).resize(function () {
      $rootScope.$apply(function () {
        setWindowDimensions($rootScope);
      });
    });
  })
  .filter('joinList', function () {
    return function (input, divider) {
      return input.join(divider);
    };
  });
