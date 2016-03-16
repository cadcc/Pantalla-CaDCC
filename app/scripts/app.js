'use strict';

var setWindowDimensions = function (scope) {
  scope.windowWidth = window.innerWidth;
  scope.windowHeight = window.innerHeight;
};

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
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function ($rootScope) {
    setWindowDimensions($rootScope);

    $(window).resize(function () {
      $rootScope.$apply(function () {
        setWindowDimensions($rootScope);
      });
    });
  });
