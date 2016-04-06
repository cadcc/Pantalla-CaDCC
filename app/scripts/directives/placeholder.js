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
      templateUrl: 'views/directives/placeholder.html',
      controller: ['$scope', '$interval', '$http', function ($scope, $interval, $http){
        $scope.currentImage = -1;

        var updateImages = function () {
          $scope.currentImage = ($scope.currentImage + 1) % $scope.allImages.length;
        };

        $http.get('data/placeholder.json')
          .then(function (response) {
              $scope.allImages = response.data;
              updateImages();
              $interval(updateImages, 10000);
            }
          );
      }]
    };
  });
