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
        $scope.currentPage = -1;
        $scope.currentDate = new Date();
        var updateBirthdays = function () {
          $http.get(url)
              .then(function (response) {
                var jsonData = JSON.stringify(response.data);
                if ($scope.jsonData !== jsonData) {
                  if ($scope.eventsUpdatePromise !== undefined) {
                    $interval.cancel($scope.eventsUpdatePromise);
                  }
                  $scope.jsonData = jsonData;
                  var newBirthday = [];
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
                  newBirthday = response.data.feed.entry[$scope.currentDate.getDate()]['gsx$'+months[$scope.currentDate.getMonth()]].$t,
                  $scope.birthday = newBirthday;
                }
              }
            );
        };
        updateBirthdays();
        $interval(updateBirthdays, 60000);
      }]
    };
  });

