'use strict';

var setWindowDimensions = function (scope) {
  scope.windowWidth = window.innerWidth;
  scope.windowHeight = window.innerHeight;
};

var updateListInterval = function (scope, dstKey, srcKey, pageSize) {

  var currentPage = -1;

  return function () {
    currentPage += 1;

    if (currentPage >= parseInt(scope[srcKey].length / pageSize) + 1) {
      currentPage = 0;
    }
    var startIndex = (currentPage) * pageSize;

    scope[dstKey] = scope[srcKey].slice(startIndex, startIndex + pageSize);
  };
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
        controller: 'MainCtrl',
        controllerAs: 'main'
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
  })
  .run(function ($rootScope) {
    $rootScope.parseInt = parseInt;
  })
  .filter('joinList', function () {
    return function (input, divider) {
      return input.join(divider);
    };
  });
