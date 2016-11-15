'use strict';

/**
 * @ngdoc function
 * @name pantallaCaDccApp.directive:Scroller
 * @description
 * # Scroller
 * Directive of the pantallaCaDccApp
 */
angular.module('pantallaCaDccApp')
  .directive('scroller', function () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'views/directives/scroller.html',
      controller: ['$scope', '$interval', '$http', function ($scope, $interval, $http) {

        var spreadsheetId = '1gWuiF0PrEzWPntdiyuVgcGTZxx6ABnJEXnwNztejZsg';

        var url = 'https://spreadsheets.google.com/feeds/list/' + spreadsheetId + '/3/public/values?alt=json';
        $scope.pages = { '0': 'Cumpleaños',
                         '1': 'Facebook',
                         '2': 'Twitter',
                         '3': 'Noticias'};
        $scope.currentDate = new Date();

        $scope.currentScroller = -1;

        var nextScroller = function () {
          $scope.currentScroller = ($scope.currentScroller + 1) % Object.keys($scope.pages).length;
        };

        var updateBirthdays = function () {
          $http.get(url)
              .then(function (response) {
                var jsonData = JSON.stringify(response.data);

                if ($scope.jsonData !== jsonData) {

                  if ($scope.eventsUpdatePromise !== undefined) {
                    $interval.cancel($scope.eventsUpdatePromise);
                  }
                  
                  $scope.jsonData = jsonData;
                  
                  var months = ['enero',
                                'febrero',
                                'marzo',
                                'abril',
                                'mayo',
                                'junio',
                                'julio',
                                'agosto',
                                'septiembre',
                                'octubre',
                                'noviembre',
                                'diciembre'];
                  
                  $scope.birthday = response.data.feed.entry[$scope.currentDate.getDate()-1]['gsx$'+months[$scope.currentDate.getMonth()]].$t,
                  nextScroller();
                  $scope.eventsUpdatePromise = $interval(nextScroller, 5000);
                }
              }
            );
        };
        updateBirthdays();
        $interval(updateBirthdays, 60000);
        var updateTwitterFeed = function() {
          var twitterAPI = require('node-twitter-api');
        };
      }]
    };
  });

