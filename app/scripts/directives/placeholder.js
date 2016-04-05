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
        var pageSize = 1;
        $scope.currentPage = -1;

        var updateImages = updateListInterval($scope, 'currentImage', 'allImages', pageSize);

        $http.get('data/placeholder.json')
          .then(function (response) {
              $scope.allImages = response.data;
              updateImages();
              $interval(updateImages, 7500);
            }
          );
      }]
    };
});
