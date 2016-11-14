'use strict';

/**
 * @ngdoc function
 * @name pantallaCaDccApp.directive:Kioskito
 * @description
 * # Kioskito
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
        var url = 'https://spreadsheets.google.com/feeds/list/' + spreadsheetId + '/2/public/values?alt=json';

        $scope.currentImage = -1;

        var nextImage = function () {
          $scope.currentImage = ($scope.currentImage + 1) % $scope.allImages.length;
        };
        var updateImages = function () {
          $http.get(url)
            .then(function (response) {
                var jsonData = JSON.stringify(response.data);

                if ($scope.jsonData !== jsonData) {

                  if ($scope.eventsUpdatePromise !== undefined) {
                    $interval.cancel($scope.eventsUpdatePromise);
                  }

                  $scope.jsonData = jsonData;
                  var newImages = [];

                  angular.forEach(response.data.feed.entry, function (image) {
                    newImages.push({
                      'path': image.gsx$path.$t,
                      'width': image.gsx$width.$t
                    });
                  });

                  $scope.allImages = newImages;

                  nextImage();
                  $scope.eventsUpdatePromise = $interval(nextImage, 10000);
                }
              }
            );
        };

        updateImages();
        $interval(updateImages, 60000);
      }]
    };
  });
